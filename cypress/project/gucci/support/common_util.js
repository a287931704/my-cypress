const getDateTime = () => {
  // 获取当前日期时间
  let myDate = new Date();
  // myDate.toLocaleDateString();                //获取当前日期
  // var mytime1=myDate.toLocaleTimeString();     //获取当前时间
  return myDate.toLocaleString();
}

// export const constants = {
//   env: 'uat'
// }

export function checkout_Alipay(){
  cy.allure().step('勾选隐私政策');
  cy.get('i[data-name="privateStat"]').click();
  cy.allure().step('提交订单');
  cy.get('#createOrder').click();
  cy.get('.spice-unaccepted-order-other').should('contain','支付宝');
  cy.allure().step('获取订单code');
  return cy.get('.spice-unaccepted-title-info').find('span').first().should('be.visible');
}

export function checkout_Wepay(){
  cy.allure().step('选择微信支付');
  cy.get('.spice-float-clearfix.spice-checkout-payment-waysul')
    .contains('微信支付')
    .click();
  cy.allure().step('勾选隐私政策');
  cy.get('i[data-name="privateStat"]').click();
  cy.allure().step('提交订单');
  cy.get('#createOrder').click();
  cy.get('.spice-unaccepted-order-other').should('contain','微信支付');
  cy.allure().step('获取订单code');
  return cy.get('.spice-unaccepted-title-info').find('span').first().should('be.visible');
}

export function checkout_Huabei(){
  cy.allure().step('选择花呗分期');
  cy.get('.spice-float-clearfix.spice-checkout-payment-waysul')
    .contains('花呗分期')
    .click();
  cy.get('li[periods="6"]').click();
  cy.allure().step('勾选隐私政策');
  cy.get('i[data-name="privateStat"]').click();
  cy.allure().step('提交订单');
  cy.get('#createOrder').click();
  cy.get('.spice-unaccepted-order-other').should('contain','花呗分期');
  cy.allure().step('获取订单code');
  return cy.get('.spice-unaccepted-title-info').find('span').first().should('be.visible');
}

export function cancel_order(orderCode){
  cy.visit('/');
  cy.allure().step('进入我的订单');
  //cy.get('.login-text').contains('我的账户').click();
  cy.get('.login-text').contains('我的账户').realHover();
  //cy.get('.spice-float-clearfix').contains('我的账户').click();
  cy.contains('我的订单').click();
  cy.allure().step('检查订单' + orderCode + '是否待支付状态');
  cy.get('div.orderlist-wrap.orderlist-wrap-all').contains(orderCode).parents('.order-list-detailed')
    .find('.spice-order-lists-status').should('contain', '待支付');
  cy.allure().step('点击确定-取消订单');
  cy.get('div.orderlist-wrap.orderlist-wrap-all').contains(orderCode).parents('.order-list-detailed')
    .find('.spice-btn.spice-btn-cancel.e-payment-cancel').click();
  cy.get('.spice-btn.spice-btn-black-light.e-btn-determine').click();
  cy.allure().step('检查订单' + orderCode + '是否已取消');
  cy.get('.order-completed').click();
  cy.get('div.orderlist-wrap[status="completed"]').contains(orderCode).parents('.order-list-detailed')
    .find('.spice-order-lists-status').should('contain', '订单已取消');
}

export function check_orderstatus(){
  cy.visit('/');
  cy.allure().step('进入我的订单');
  //cy.get('.login-text').contains('我的账户').click();
  cy.get('.login-text').contains('我的账户').realHover();
  //cy.get('.spice-float-clearfix').contains('我的账户').click();
  cy.contains('我的订单').click();
  cy.get('.order-completed').click();
  cy.log(cy.get('.orderlist-wrap[status="completed"]').contains('#GU20220629948097'))
  
  //.contains(orderCode).parents('.order-list-detailed')
  //.find('.spice-order-lists-status').should('contain', '订单已取消');
}

export function login(){
  cy.fixture("data").then(data=>{
    cy.allure().step('点击登录icon');
    cy.get('.login-text').contains('登录').click();
    cy.get('.spice-link-gray.e-login-model').click();
    cy.allure().step('输入用户名');
    cy.get('#loginMobileOrEmail')
      .type(data.user.name);
    cy.allure().step('输入密码');
    cy.get('#loginPassword')
    .type(data.user.password);
    cy.allure().step('点击登录');
    cy.get('#memberlogin').click();
    cy.wait(1000);
    cy.get('.login-text').contains('我的账户').should('be.visible');
  })
}

export function search_operate(){
  cy.allure().step('点击放大镜');
  cy.get('.icon-header-search.svg-iconfont.search-icon.e-search-open').click();
  cy.allure().step('搜索制定商品"6600254G3862579"');
  cy.get('#keyword').type('6600254G3862579');// 307929BLM001000 6600254G3862579
  cy.allure().step('输入回车搜索');
  cy.get('.spice-seach-box-button.icon-svg-search.svg-iconfont').click();
}

export function into_plp(p_url){
  if(p_url){
    cy.visit(p_url);
  }
  else{
    cy.allure().step('点击导航"女士"');
    cy.get('.navtitletxt')
      .contains('女士')
      .click();
  }
}

export function into_womens_handbags(){
  cy.allure().step('hover导航-男士');
  cy.get('.navtitletxt')
    .contains('男士')
    .realHover();
  cy.allure().step('点击二级导航-男士箱包');
  cy.get('.spice-menu-list-item')
    .contains('男士箱包')
    .click();
}

export function into_womens_shoes(){
  cy.allure().step('hover导航-女士');
  cy.get('.navtitletxt')
    .contains('女士')
    .realHover();
  cy.allure().step('点击二级导航-手袋');
  cy.get('.spice-menu-list-item')
    .contains('女鞋')
    .click();
}

export function into_pdp_from_plp(){
  cy.allure().step('点击首个商品');
  cy.get('.spice-product-tiles-slot.spice-product-index.grid-cell').first()
    .realHover().find('.spice-item-grid-hover.spice-product-index-sub').contains('立即购买').click({force:true});
  //cy.get('.spice-item-grid-hover.spice-product-index-sub').contains('立即购买').first().click();
  cy.get('div.spice-product-purchas-wrap').then(obj => {
      if (obj.find('div.spice-dropdown-pdp-size.e-dropdown-pdp-size.border-drop').length>0) {
        //存在执行逻辑
        cy.get('div.spice-dropdown-pdp-size.e-dropdown-pdp-size.border-drop').click();
        cy.get('div.spice-dropdown-pdp-size.e-dropdown-pdp-size.border-drop').find('ul>li').find('span')
          .not('.spice-size-no').last().click();
        cy.get('#add_product_shopCart').click();
      } else {
        //不存在执行逻辑
        cy.get('#add_product_shopCart').click();
      }
    })
  //cy.get('.visual-hover-img').click()
  //cy.get('.spice-style-number-title').should('contain','660025 4G386 2579')
}

// export function select_enable_size(){
//   cy.allure().step('选择有库存的尺码');
//   cy.get('div.size-swiper div:not(.is-disabled)').first()
//     .click({force: true});
// }

// export function select_first_size(){
//   cy.allure().step('选择有库存的尺码');
//   cy.get('div.size-swiper div').first()
//     .click({force: true});
// }

export function addcart_goto_checkout(){
  //cy.allure().step('加入购物车');
  //cy.get('#add_product_shopCart').click();
  cy.allure().step('查看购物车');
  cy.get('.spice-header-shoppingcart.e-header-shoppingcart.spice-header-mincart-length-1').click();
  cy.allure().step('立即结算')
  cy.get('.spice-shopping-cart-summary.e-spice-shopping-cart-summary')
    .contains('立即结算')
    .click();
}



// export function favorite_operate(){
//   cy.get('.detail-title').then(
//     obj=>{
//       cy.allure().step('点击收藏');
//       cy.get('a.btn-collect > img').first().click()
//       cy.allure().step('校验收藏成功');
//       cy.get('a.btn-collect > img:nth-of-type(2)').should("be.visible")
//       cy.allure().step('进入心愿单');
//       cy.get('.icon.iconfont.fun-icon.iconxin').click();
//       cy.allure().step('检验心愿单第一个商品名称与刚才被收藏是否一致');
//       cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-top > h3').should('contain', obj.text());
//       cy.allure().step('移除心愿单商品');
//       cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-delete').click();
//       cy.allure().step('点击确认移除心愿单');
//       cy.get('.popup-box.confirm-box').contains('确认移除').click();
//     }
//   )
// }

export {
  getDateTime
}