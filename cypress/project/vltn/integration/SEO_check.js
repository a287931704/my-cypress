/// <reference types="cypress" />
import "cypress-real-events/support";
// import * as commonUtil from '../support/common_util';

const commonUtil = require('../support/common_util');
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


describe('VLTN-SEO优化检测', () => {
  beforeEach(() => {
    // const allure = Cypress.Allure.reporter.getInterface();
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visitHomepage();
    // cy.visitUrl('/zh-cn/1W2S0FC2TBF0NO');
    cy.visitHomepage();
  })

  // let mydate1 = commonUtil.getDateTime();
  it('SEO优化检测', () => {
    // commonUtil.login();
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.fixture('data').then(data => {
      let dic = {
        "https://valentino-uat..com/login.html": "Valentino中国官方网站登陆注册页",
        "https://valentino-uat..com/my-account/wishlist.html": "Valentino中国官方网站心愿单",
        "https://valentino-uat..com/my-account/order-list.html": "Valentino中国官方网站订单列表页",
        "https://valentino-uat..com/cart.html": "Valentino中国官方网站购物车页",
        "https://valentino-uat..com/myaccount.html": "Valentino中国官方网站注册会员",
        "https://valentino-uat..com/contactUs.html": "Valentino中国官方网站联系客户服务",
        "https://valentino-uat..com/shipping.html": "Valentino中国官方网站配送信息",
        "https://valentino-uat..com/returnsandrefunds.html": "Valentino中国官方网站如何退换货",
        "https://valentino-uat..com/searchorder.html": "Valentino中国官方网站我的帐户 / 我的订单",
        "https://valentino-uat..com/payments.html": "Valentino中国官方网站付款方式",
        "https://valentino-uat..com/shopping.html": "Valentino中国官方网站礼品服务",
        "https://valentino-uat..com/boutique.html": "Valentino中国官方网站量身定制正装",
        "https://valentino-uat..com/boutique.html?type=denim": "Valentino中国官方网站量身定制牛仔",
        "https://valentino-uat..com/boutique.html?type=sneaker": "Valentino中国官方网站个性化定制运动鞋",
        "https://valentino-uat..com/storeSearch.html?flag=store": "Valentino中国官方网站订阅电子通讯",
        "https://valentino-uat..com/useterms.html": "Valentino中国官方网站使用条款和条件",
        "https://valentino-uat..com/saleterms.html": "Valentino中国官方网站销售条款和条件",
        "https://valentino-uat..com/returnpolicy.html": "Valentino中国官方网站退换货政策",
        "https://valentino-uat..com/privacypolicy.html": "Valentino中国官方网站隐私政策",
        "https://valentino-uat..com/boutiquepurchase.html": "Valentino中国官方网站线下精品店退货政策",
        "https://valentino-uat..com/zh-cn/maison/valentino": "Valentino中国官方网站VALENTINO世界"
      }
      commonUtil.login();
      for (var key in dic) {
        cy.allure().step('访问' + key)
        cy.intercept('*graphql*').as('XHR')
        cy.visitUrl(key.replace('https://valentino-uat..com/', data.url))
        cy.wait("@XHR")
          .its("response.statusCode")
          .should("eq", 200);
        cy.allure().step('检测是否包含:' + dic[key])
        cy.get('h1').should('include.text', dic[key]).invoke('text')
        cy.get('h1').should('include.text', dic[key]).and('be.visible').first()
        cy.screenshot(dic[key]);
      }
    })
  })
})