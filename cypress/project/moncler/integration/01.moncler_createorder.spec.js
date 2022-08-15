/// <reference types="cypress" />
import "cypress-real-events/support";
import { getDateTime, login, into_plp, cancel_order, checkout_page_default } from '../support/common_util';
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

describe('创单流程', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visitHomepage();
    })

    let mydate1 = getDateTime();

    it('立即购买流程', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      login();
      into_plp();
      cy.allure().step('点击首个商品');
      cy.get('div.goods_list').first()
        .children('div:nth-child(1)')
        .click();
      cy.allure().step('点击立即购买');
      cy.contains('立即购买').click();
      
      checkout_page_default();
      cancel_order();

    });

    it('普通创单流程', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      login();
      into_plp();
      cy.allure().step('点击首个商品');
      cy.get('div.goods_list').first()
        .children('div:nth-child(1)')
        .click()
      cy.allure().step('点击添加至购物袋');
      cy.contains('添加至购物袋').click()
      cy.allure().step('去购物袋结算');
      cy.contains('去购物袋结算').click()
      cy.allure().step('立即结算');
      cy.contains('立即结算').click()
      checkout_page_default();
      cancel_order();

    });

    
  })