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

describe('VLTN创单流程-'+Cypress.env('environment'), () => {
  beforeEach(() => {
    // const allure = Cypress.Allure.reporter.getInterface();
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visitHomepage();
    // cy.visitUrl('/zh-cn/1W2S0FC2TBF0NO');
    // cy.visit('/zh-cn/1B3AB3Y27AP01N?key=plpFilterParam',{
    //   auth: {
    //     username:'user_dunhill',
    //     password:'FdUV@73TEeU%'
    //   }
    // })
  })

  // let mydate1 = commonUtil.getDateTime();

  it('普通商品创单流程-'+Cypress.env('environment'), () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    // cy.on('fail', (e) => {
    //   console.error(e)
    // })
    commonUtil.login();
    cy.fixture('paymethod.json').then((pay) => {
      for (const index in pay) {
        // let index = 0;
        if (Cypress.env('environment') === 'uat') {
          //如果是uat，由于导航栏不同，故使用搜索进入PLP
          commonUtil.search_operate();
        }
        else {
          //从导航进入PLP
          commonUtil.into_plp();
        }
        //在PLP默认选择第一个商品进入PDP
        commonUtil.into_pdp_from_plp();
        //选择可用尺码
        commonUtil.select_enable_size();
        //加购并进入结算页
        commonUtil.addcart_goto_checkout();
        //结算页默认操作并却结算
        cy.allure().step(pay[index].paymethod+'下单发起');
        commonUtil.checkout_page_default(pay[index].paymethod).then(obj => {
          //取消订单，传入订单号和支付方式，支付方式将在银联支付跳转bug修复后删除此传参
          if(pay[index].paymethod==='银联'){
            commonUtil.cancel_order(0);
          }else{
            commonUtil.cancel_order(obj.text());

          }
        })


      }

    })

  })


  it('定制商品创单流程-'+Cypress.env('environment'), () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    commonUtil.login();
    cy.fixture('paymethod.json').then((pay) => {
      if (Cypress.env('environment') != 'uat') {
        //从导航进入宠物定制商品PLP
        commonUtil.into_pets_plp();
        //在PLP默认选择第一个商品进入PDP
        commonUtil.into_pdp_from_plp();
        cy.wait(2000)
        //宠物定制商品操作并去结算
        commonUtil.vip_item_operate();
        //结算页面操作
        commonUtil.checkout_page_default(pay[0].paymethod).then(obj => {
          //取消订单
          commonUtil.cancel_order(obj.text());
        })
      }else{
        cy.visitUrl('/zh-cn/ZWPB0B702002GM').wait(2000)
        commonUtil.vip_item_operate();
        //结算页面操作
        commonUtil.checkout_page_default(pay[0].paymethod).then(obj => {
          //取消订单
          commonUtil.cancel_order(obj.text());
        })
      }


    })

  })

  // it.only('test', () =>{
  //   // commonUtil.login();
  //   // cy.visitUrl('https://www.valentino.cn/my-account/order-list.html')
  //   // cy.wait(3000)
  //   commonUtil.bbb().then(obj=>{
  //     cy.log(obj.text())
  //     cy.visitHomepage();
  //     cy.log(obj.text())
  //   })
  //   // cy.get('.detail-title').should('be.visible').as('pdptitle').then(obj=>{
  //   //   cy.log(obj.text())
  //   //   Cypress.env('aaa',obj.text())
  //   //   cy.visitHomepage();
  //   //   cy.log(obj.text())
  //   //   cy.log(Cypress.env('aaa'))
  //   // })
  // });


})