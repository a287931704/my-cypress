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

describe('dunhill创单流程', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      commonUtil.popin_tc_privacy_button();
      // cy.setCookie('TC_PRIVACY','0@002%7C3%7C6095@10@@1660096276814%2C1660096276814%2C1693792276814@')
      cy.visitHomepage();
    })

    it('陆运商品下单流程',() => {
      commonUtil.icon_section();
      commonUtil.goods_box();
      commonUtil.size_box();
      commonUtil.buy_now();
      commonUtil.checkout_member_login();
      commonUtil.checkout_page_default();
      commonUtil.cancel_order();
    })

    it('空运商品下单流程', () => {
      commonUtil.icon_section_air_transport();
      commonUtil.goods_box();
      commonUtil.size_box();
      commonUtil.buy_now();
      commonUtil.checkout_member_login();
      commonUtil.checkout_page_default();
      commonUtil.cancel_order();
    });

    // it('普通创单流程', () => {
    //   // We use the `cy.get()` command to get all elements that match the selector.
    //   // Then, we use `should` to assert that there are two matched items,
    //   // which are the two default items.
    //   login();
    //   into_plp();
    //   cy.allure().step('点击首个商品');
    //   cy.get('div.goods_list').first()
    //     .children('div:nth-child(1)')
    //     .click()
    //   cy.allure().step('点击添加至购物袋');
    //   cy.contains('添加至购物袋').click()
    //   cy.allure().step('去购物袋结算');
    //   cy.contains('去购物袋结算').click()
    //   cy.allure().step('立即结算');
    //   cy.contains('立即结算').click()
    //   checkout_page_default();
    //   cancel_order();

    // });
  })