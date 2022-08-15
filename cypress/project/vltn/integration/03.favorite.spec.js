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


describe('VLTN心愿单操作-'+Cypress.env('environment'), () => {
  beforeEach(() => {
    // const allure = Cypress.Allure.reporter.getInterface();
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visitHomepage();
  })

  // let mydate1 = commonUtil.getDateTime();
  it('加入移除心愿单-'+Cypress.env('environment'), () => {
    commonUtil.login();
    if (Cypress.env('environment') === 'uat') {
      //如果是uat，由于导航栏不同，故使用搜索进入PLP
      commonUtil.search_operate();
    }
    else {
      //从导航进入PLP
      commonUtil.into_plp();
    }
    commonUtil.into_pdp_from_plp();
    commonUtil.select_enable_size();
    commonUtil.favorite_add().then(obj => {
      commonUtil.favorite_operate(obj.text());
    })

  });

  it('分享心愿单-'+Cypress.env('environment'), () => {

    commonUtil.login();
    cy.allure().step('进入心愿单');
    cy.get('.icon.iconfont.fun-icon.iconxin').click({ force: true });
    cy.allure().step('全选商品');
    // cy.get('label.ace-checkbox.allChecked-input').find('.ace-checkbox-input').click();
    cy.get('ul.wishlist-products').find('span.ace-checkbox-input').click({ multiple: true })
    cy.allure().step('点击分享心愿单');
    cy.get('div.wishlist-confirm').contains('分享心愿单').click();
    cy.allure().step('校验是否弹出分享div');
    cy.get('.copyOrsave').should('be.visible');
    cy.screenshot();
    cy.allure().step('点击X关闭');
    cy.get('.icon.iconfont.iconCLOSE-WHITE').click();
    cy.allure().step('点击朋友代付');
    cy.get('div.wishlist-confirm').contains('朋友代付').click();
    cy.wait(1000);
    cy.allure().step('点击同意协议');
    cy.get('.ace-checkbox-input').click();
    cy.allure().step('确认并分享');
    cy.get('div.addressButton').contains('确认并分享').click();
    cy.allure().step('校验是否弹出分享div');
    cy.get('.copyOrsave').should('be.visible');
    cy.screenshot();
    cy.allure().step('点击X关闭');
    cy.get('.icon.iconfont.iconCLOSE-WHITE').click();
  })
})