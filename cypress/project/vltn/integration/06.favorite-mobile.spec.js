/// <reference types="cypress" />
import "cypress-real-events/support";
import * as commonUtil from '../support/common_util';
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress


describe('VLTN-Mobile心愿单操作-'+Cypress.env('environment'), () => {
  beforeEach(() => {
    // const allure = Cypress.Allure.reporter.getInterface();
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visitHomepage(Cypress.env('device'));
  })

  // let mydate1 = commonUtil.getDateTime();
  it('加入移除心愿单-'+Cypress.env('environment'), () => {
    commonUtil.login(1);
    if (Cypress.env('environment') === 'uat') {
      //如果是uat，由于导航栏不同，故使用搜索进入PLP
      commonUtil.search_operate(undefined,1);
    }
    else {
      //从导航进入PLP
      commonUtil.into_plp(1);
      // commonUtil.search_operate(undefined,1);
    }
    commonUtil.into_pdp_from_plp(1);
    commonUtil.select_enable_size(1);
    commonUtil.favorite_add(1).then(obj => {
      commonUtil.favorite_operate(obj.text(),1);
    })

  });

  it('分享心愿单-'+Cypress.env('environment'), () => {
    commonUtil.login(1);
    commonUtil.share_favorite(1)
  })
})