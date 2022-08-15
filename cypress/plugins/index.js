/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
const db = require('../support/db_operation');
const axios = require('axios');
const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(environment, site) {
  const configPath = `projects/${site}/config`;
  const pathToConfigFile = path.resolve(".", configPath, `${environment}.json`);

  return fs.readJson(pathToConfigFile);
  // return object.assign({}, fs.readJson(pathToConfigFile))
}
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const environment = config.env.environment || "prod";
  const site = config.env.site || "vltn";
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // config.defaultCommandTimeout = 10000;
  config.env.allureResultsPath = "cypress/project/" + site + "/allure-results";
  config.integrationFolder = "cypress/project/" + site + "/integration";
  config.fixturesFolder = "cypress/project/" + site + "/fixtures/" + environment;
  config.ignoreTestFiles = "*.hot-update.js";
  config.screenshotsFolder = "cypress/project/" + site + "/screenshots";
  config.videosFolder = "cypress/project/" + site + "/videos";
  config.downloadsFolder = "cypress/project/" + site + "/downloadsFolder";
  config.integrationFolder = "cypress/project/" + site + "/integration";
  AllureWriter(on, config);
  on('after:run', (results) => {
    //执行结果入库
    db.addResults(config.env.project_key, results);
    db.closeConnection();
    //发送执行结果到微信机器人
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cd84d2b1-bc9f-4361-9f61-0157d9618bd6',
      {
        "msgtype": "markdown",
        "markdown": {
          "content": config.env.site + "-" + environment + "-UI自动化共执行用例<font color=\"warning\">" + results.totalTests + "</font>条。\n \
                 >Passed：<font color=\"green\">" + results.totalPassed + "</font> \n \
                 >Failed：<font color=\"red\">" + results.totalFailed + "</font> \n \
                 >Pending：<font color=\"comment\">" + results.totalSkipped + "</font> \n \
                 >Skipped：<font color=\"comment\">" + results.totalPending + "</font> \n \
                 >[点击查看Allure报告](http://www.baidu.com)"
        }
      }
    ).then(res => {
      console.log('------------------------------------------');
      console.log('res=>', res);
    });
  })
  on('before:browser:launch', (browser, launchOptions) => {
    // if ((browser.name === 'chrome' || browser.name === 'edge') && browser.isHeadless) {
    launchOptions.args.push("--disable-dev-shm-usage");
    launchOptions.args.push("--js-flags=--expose-gc");
    launchOptions.args.push('--disable-gpu');
    return launchOptions
    // }
  });
  return config;
};

