/// <reference types="cypress" />
import "cypress-real-events/support";
import * as commonUtil from '../support/common_util';

/*
本篇为cypress的操作指南
以下所有的用法都能在https://example.cypress.io/commands官网中查找到
并且官网中提供了更丰富的扩展函数和用法
有兴趣的同学可以去翻看下
*/

//describe为用例集的名称
describe('代码操作指南', () => {
  beforeEach(() => {
    //访问站点首页，此为beforEach中必写代码，可以带入device设备名称参数，例如'iphone-xr'，将开启手机端
    cy.visitHomepage();
  })

  //二级名称
  context('math', () => {
    it('用例名称', () => {
      //...
    })
  })

  //it开头的为一个用例，执行此js时，会将所有的it都执行一次
  //it.only | it.skip 两种方式，分别是 只运行这个 | 跳过这个
  it('普通操作', () => {
    //cypress自带的url访问方法
    cy.visit('url')
    //查找元素
    cy.get('selector').find('selector').click()
    //首个、最后一个元素定位
    cy.get('selector').find('selector').first().last().click()
    //被定位元素的下一个
    cy.get('selector').find('selector').next().click()
    //被定位元素的上一个
    cy.get('selector').find('selector').prev().click()
    //被定位元素中的第二个，下标从0开始，eq(1)表示第二个，以此类推
    cy.get('selector').find('selector').eq(1).click()

    //contains查找text定位
    cy.contains('value').click()
    cy.get('selector').contains('value').click()
    //光标已定位处输入
    cy.focused().type('value')
    //加入断言查找
    cy.get('selector').should('be.visible').click()
    //组合查找
    cy.get('selector').should('be.visible').and('not.be.disabled').click()

    //报告中步骤描述，每个动作前建议都加上
    cy.allure().step('读取数据文件内容');
    //读取数据文件内容
    cy.fixture("data.json").then(data => {
      cy.get('').type(data.user.name)
    });

    cy.wait(2000) //手动等待 毫秒单位

    //调用公共方法
    commonUtil.test_function('test')
  });

  it.skip('高级操作', () => {
    //拦截动态请求进行操作
    cy.intercept('*login.do*').as('XHR') //加入拦截请求事件，写在对应请求事件点击触发前
    cy.wait("@XHR").its('response.body.data.mobile').should('eq', '17521187685') //一句代码版的拦截请求后进行response提取和断言
    //可以写更多判断逻辑的拦截请求判断方式
    cy.wait("@XHR")
      .then(({ request, response }) => {
        //断言报文字段
        expect(response.body.data.mobile).to.equal('17521187681')
      })

    //判断元素是否存在，执行不同逻辑方法1
    cy.get('html').then(obj => {
      if (obj.find('a.btn-collect > img').first().length) {
        //存在执行逻辑
      } else {
        //不存在执行逻辑
      }
    })

    //判断元素某个属性是否匹配，执行不同逻辑方法，下面的是判断元素是否带有display的样式
    cy.get('html').then(obj => {
      if (obj.find('a.btn-collect > img:nth-child(1)').attr('style').indexOf('display') >= 0) {
        //带有display
      } else {
        //不带有display
      }
    })

    //判断元素是否存在，执行不同逻辑方法2
    if (Cypress.$('selector').find('selector').length) {
      // 存在执行逻辑
    }
    else {
      // 不存在执行逻辑
    }
    cy.url() //获取当前页面url
    Cypress.env('environment') //获取用例运行环境信息
    Cypress.env('site') //获取用例运行的项目的名称
    //打印日志用于调试
    cy.log('value')
  });


})