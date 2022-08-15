/// <reference types="cypress" />
import "cypress-real-events/support";
// import * as commonUtil from '../support/common_util';

const commonUtil= require('../support/common_util');
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


describe('VLTN搜索-'+Cypress.env('environment'), () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visitHomepage();
    })

    // let mydate1 = commonUtil.getDateTime();
    it('搜索-'+Cypress.env('environment'), () => {
      // commonUtil.login();
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      commonUtil.search_operate("鞋");
      if (Cypress.env('environment') != 'uat') {
        cy.allure().step('检查是否一页显示了20个商品');
        cy.get('.producList > div').should('have.length', 20);
        cy.allure().step('点击加载更多');
        cy.contains('加载更多').click();
        cy.allure().step('检查是否一页显示了40个商品');
        cy.get('.producList > div').should('have.length.above', 20);
        cy.allure().step('再次点击加载更多');
        cy.contains('加载更多').click();
        cy.allure().step('检查是否一页显示了60个商品');
        cy.get('.producList > div').should('have.length.above', 40);
      }else{
        cy.allure().step('检查是否一页显示了20个商品');
        cy.get('.producList > div').should('have.length', 20);
        cy.allure().step('点击加载更多');
        cy.contains('加载更多').click();
        cy.allure().step('检查是否一页显示了超过20个商品');
        cy.get('.producList > div').should('have.length.above', 20);
      }
      cy.screenshot();
    })
  })