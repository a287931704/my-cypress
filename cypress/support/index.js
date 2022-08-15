// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import '@shelex/cypress-allure-plugin';
// Import commands.js using ES2015 syntax:
import './commands'
import "../project/vltn/support/commands";
import "../project/dunhill/support/commands";
import "../project/gucci/support/commands";
import "../project/moncler/support/commands";
import "../project/toryburch/support/commands";
import "../project/nike/support/commands";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
// Alternatively you can use CommonJS syntax:
// require('./commands')

// after(() => {
//   cy.request(
//     {
//       url:'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=08d9801a-4b5e-4ddb-a4aa-dc5747023908',
//       method:'POST',
//       headers:{
//         "Content-Type": "application/json"
//       },
//       body:   {
//         "msgtype": "text",
//         "text": {
//             "content": Cypress.env('site')+" UI自动化执行完成 ; 报告地址:http://10.88.29.19:9998"
//         }
//     }
//   }
//   )
// });
