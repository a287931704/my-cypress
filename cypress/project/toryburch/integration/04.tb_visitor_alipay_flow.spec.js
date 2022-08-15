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


//游客下单（pdp加购+支付宝）
describe('Tb_Visitor1_pdp加购+支付宝', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visitHomepage();
      //cy.visitUrl('/item/79436-909')
    })

    // let mydate1 = commonUtil.getDateTime();

    it('Tb_Visitor1_pdp加购+支付宝', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      //commonUtil.cookie();
      commonUtil.into_plp_from_navigation();
      commonUtil.into_pdp_from_plp();
      commonUtil.pdp_add_to_cart();
      commonUtil.into_shoppingcart();
      commonUtil.checkout_visitor_login();
      commonUtil.checkout_visitor_part1();
      commonUtil.checkout_part2();
      commonUtil.ordercode().then(code => {
        commonUtil.visitor_cancel_order(code)
      })
    });


  })