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

describe('会员QS信用卡自提点创单', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visitHomepage();
    })

    // let mydate1 = commonUtil.getDateTime();


  it('会员QS信用卡自提点创单', () => {
    commonUtil.login()
    commonUtil.qs_pdp_check()
    commonUtil.checkout_pop()
    commonUtil.o2o_check()
    commonUtil.GLOBALPAY()
    commonUtil.checkout()
    commonUtil.qs_order_affirm()
    commonUtil.cancel_order()

  });
})