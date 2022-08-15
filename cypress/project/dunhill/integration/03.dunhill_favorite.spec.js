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


describe.skip('dunhill收藏夹', () => {
    beforeEach(() => {
      // const allure = Cypress.Allure.reporter.getInterface();
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      commonUtil.popin_tc_privacy_button();
      cy.visitHomepage();
    })

    it.skip('收藏夹', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      commonUtil.login();
      // cy.get('a').invoke('removeAttr', 'target').click()
      commonUtil.into_plp();
      cy.allure().step('点击首个商品');
      cy.get('div.goods_list').first()
        .children('div:nth-child(1)')
        .click();
      cy.allure().step('点击添加收藏夹');
      cy.contains('添加至收藏夹').click();
      cy.allure().step('判断提示信息是否可见');
      cy.contains('您已将该商品保存在收藏夹中，请查看收藏夹').parent('div').parent('div').parent('div').should('be.visible');
      cy.allure().step('关闭提示信息');
      cy.contains('您已将该商品保存在收藏夹中，请查看收藏夹').parent('div').parent('div').children('div.close').click();
      cy.allure().step('判断提示信息是否关闭');
      cy.contains('您已将该商品保存在收藏夹中，请查看收藏夹').parent('div').parent('div').parent('div').should('not.be.visible');
      cy.allure().step('去收藏夹');
      // cy.request('GET', 'https://www.baidu.com').then((res)=>{
      //   //获取jwt token并存入localStorage中
      //   window.localStorage.setItem('jwt', '111')
      // });
      // cy.contains('是的，请删除').click();
      // cy.get('#app > div.main > div > div:nth-child(7)').should('be.visible');
    })
  })