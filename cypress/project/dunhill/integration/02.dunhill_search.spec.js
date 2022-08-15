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


describe('dunhill搜索', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      commonUtil.popin_tc_privacy_button();
      cy.visitHomepage();
    })

    commonUtil.getDateTime();

    it('查询特殊商品',() =>{
      commonUtil.icon_section();
    })


    it('搜索', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.allure().epic('搜索模块1');
      cy.allure().feature('搜索模块2');
      cy.allure().step('点击放大镜');
      cy.get('.icon_section .iconfont.icon-SEARCH-BLACK').click();
      cy.allure().step('输入搜索条件"1"');
      cy.focused().type('1');
      cy.allure().step('输入回车搜索');
      cy.realPress('Enter');
      cy.get('.goods_list > div').should('have.length', 12);
    })
  })