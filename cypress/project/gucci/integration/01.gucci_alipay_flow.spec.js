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

describe('Gucci单件支付宝创单流程-'+Cypress.env('environment'), () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visitHomepage();
    })

    // let mydate1 = commonUtil.getDateTime();

    it('搜索单件支付宝创单-'+Cypress.env('environment'), () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      commonUtil.login();
      //commonUtil.check_orderstatus();
      commonUtil.search_operate();
      //commonUtil.into_plp();
      commonUtil.into_pdp_from_plp();
      commonUtil.addcart_goto_checkout();
      commonUtil.checkout_Alipay().then(obj => {
        //取消订单，传入订单号和支付方式，支付方式将在银联支付跳转bug修复后删除此传参
        commonUtil.cancel_order(obj.text());
      });
    });
    
  })

  //describe('Gucci_Test', () => {
    //beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      //cy.visitHomepage();
    //})

    // let mydate1 = commonUtil.getDateTime();

    //it('Test_Flow', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      //commonUtil.login();
      //commonUtil.check_orderstatus();
      //commonUtil.search_operate();
      //commonUtil.into_plp();
      //commonUtil.into_pdp_from_plp();
    //});
    
  //})