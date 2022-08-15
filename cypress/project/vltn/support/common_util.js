export const getDateTime = () => {
  // 获取当前日期时间
  let myDate = new Date();
  // myDate.toLocaleDateString();                //获取当前日期
  // var mytime1=myDate.toLocaleTimeString();     //获取当前时间
  return myDate.toLocaleString();
}

// export const constants = {
//   env: 'uat'
// }


/**
 *结算页中地址、配送方式、支付方式确认
 *
 * @export
 * @param {*} p_paymethod 支付方式
 */
export function checkout_page_default(p_paymethod, p_isMobile=0) {
  cy.log(p_paymethod);
  let pay_str = p_paymethod == null ? "支付宝" : p_paymethod;
  cy.log(pay_str);
  if(!p_isMobile){
    cy.allure().step('确定地址');
    cy.get('div.addressButton').contains('确认并继续').and('be.visible').first().click();
  }
  cy.allure().step('确定配送方式');
  cy.get('div.deliverySumbit').contains('确认并继续').first().click();
  cy.allure().step('选择支付方式:' + pay_str);
  cy.contains(pay_str).click();
  cy.allure().step('确定支付方式');
  cy.get('.paySumbit').contains('确认并继续').first().click();
  cy.allure().step('勾选隐私协议');
  cy.get('.confirmPrivacy .ace-checkbox').click();
  cy.allure().step('提交订单并支付');
  cy.contains('提交订单并支付').should('be.visible').and('be.enabled').click();

  if(!p_isMobile){
    if (pay_str != '银联') {
      cy.allure().step('非银联：'+ pay_str)
      cy.allure().step('点击完成支付');
      cy.get('div.dialog-body').contains('完成支付').should('be.visible').click();
      cy.allure().step('获取订单code');
      return cy.get('li.order-info-item').first().find('span').last().should('be.visible');
    } else {
      cy.allure().step('银联：'+ pay_str)
      return cy.get('div.dialog-body').contains('完成支付').should('be.visible')
    }
  }else{
    return cy.get('body')
  }

}

//查看元素是否存在
export function isExist(p_selector) {
  if (Cypress.$(p_selector).length) {
    return true
  }
  else {
    return false
  }
}

// export function bbb(){
//   return cy.get('.detail-title').should('be.visible')
// }

/**
 *取消订单
 *
 * @export
 */
export function cancel_order(orderCode, p_isMobile=0) {
  if(p_isMobile){
    cy.visitHomepage(Cypress.env('device'));
    cy.wait(3000)
    cy.visitHomepage(Cypress.env('device'));
    this.clickLeftTab()
    cy.allure().step('点击列表中我的账户');
    cy.get('a.nav-drowMenu.nav-drowMenuFun').first().click()
    cy.allure().step('点击更多');
    cy.get('div.account-overview').contains('我的订单').parent().contains('更多').click()
    cy.allure().step('点击查看详情');
    cy.get('.order-list').contains('查看详情').first().click();
  }else{
    cy.visitHomepage();
    cy.allure().step('点击登录icon');
    cy.get('.icon.iconfont.fun-icon.iconaccount.iconACCOUNT-logged')
      .click();
    cy.allure().step('点击我的订单');
    cy.get('.vl-account-mode-has').contains('我的订单').click();
  
    if (orderCode) {
      cy.log(orderCode)
      cy.allure().step('检查订单' + orderCode + '是否待支付状态');
      cy.get('div.account-orders').contains(orderCode).parents('div.orderInfo').find('div.orderId').should('contain', '待支付')
      cy.allure().step('检查订单' + orderCode + '立即支付按钮是否可见可点');
      cy.get('div.account-orders').contains(orderCode).parents('.wrap').contains('立即支付').should('be.visible').and('be.enabled')
      cy.allure().step('点击订单' + orderCode + '查看详情');
      cy.get('div.account-orders').contains(orderCode).parents('.wrap').contains('查看详情').click()
    }else{
      cy.get('.order-list').contains('查看详情').first().click();

    }
  }
  cy.allure().step('点击确定-取消订单');
  cy.get('.account-orders-detail').contains('取消订单').should('be.visible').click();
  cy.allure().step('确认取消订单');
  cy.get('.ace-popup.cancel-popup').contains('取消订单').should('be.visible').click();
  cy.allure().step('检查已取消状态');
  cy.get('.account-orders-detail').should('be.visible').and('contain', '已取消');

}


/**
 *登录
 *
 * @export
 */
export function login(p_isMobile=0) {
  cy.fixture("data").then(data => {
    if(p_isMobile){
      this.clickLeftTab()
      cy.allure().step('点击列表中的登录');
      cy.get('a.nav-drowMenu.nav-drowMenuFun').first().click()
      cy.allure().step('点击密码登录方式tab');
      cy.get('div.login-tab > div').eq(1).click()
    }else{
      cy.allure().step('点击登录icon');
      cy.get('.icon.iconfont.fun-icon.iconaccount').click({ force: true });
      cy.contains('密码登录').click()
    }
    cy.allure().step('输入用户名');
    cy.get('div.longinForm.headerLogin').find('div.inputContainer input').first().type(data.user.name)
    cy.allure().step('输入密码');
    cy.get('div.longinForm.headerLogin').find('div.password input').first().type(data.user.password)
    cy.allure().step('输入验证码');
    cy.get('div.longinForm.headerLogin').find('div.graphicCheckCodeInput input').first().type(data.user.verifyCode)
    cy.allure().step('点击登录');
    cy.get('div.submit button').should('be.visible').click()
    cy.wait(1000)
  })
  
}


/**
 *从导航进入PLP
 *
 * @export
 * @param {*} p_isMobile
 */
export function into_plp(p_isMobile=0) {
  if(p_isMobile){
    this.clickLeftTab()
    cy.allure().step('点击一级导航');
    cy.get('ul.vl-navMode.1.active > li').eq(1).click()
    cy.allure().step('点击第一个二级导航');
    // cy.get('ul.suggestion-list > li a').eq(1).should('be.visible').click()
    cy.get('ul.vl-navMode.2.active > li').contains('女士').should('be.visible').first().click()
  }else{
    cy.allure().step('点击导航第一个链接');
    cy.get('.vl-header-nav.sm-hide .vl-navMode li a')
    .first()
    .click({ force: true });
    cy.allure().step('点击二级导航第一个链接');
    cy.get('.nav-drowModeItem a')
      .eq(2).invoke("removeAttr", "target")
      .click({ force: true });

    }

}


export function clickLeftTab() {
  cy.allure().step('点击弹出mobile侧边栏');
  cy.get('div.vl-header-fun-mode.vl-header-fun-left').find('a.fun-item.hide.sm-flex-show').should('be.visible').first().click().wait(2000)
}

/**
 *从导航进入宠物定制商品的PLP页面
 *
 * @export
 */
export function into_pets_plp(p_isMobile=0) {
  cy.visitUrl('/zh-cn/unisex/valentino-pet-accessories')
  // if(p_isMobile){
  //   cy.visitUrl('/zh-cn/unisex/valentino-pet-accessories',Cypress.env('device'))
  //   // this.clickLeftTab()
  //   // cy.allure().step('点击一级导航');
  //   // cy.get('ul.vl-navMode.1.active > li').eq(5).click()
  //   // cy.allure().step('点击第一个二级导航');
  //   // cy.get('ul.suggestion-list > li a').eq(3).should('be.visible').click()
  // }else{
  //   cy.visitUrl('/zh-cn/unisex/valentino-pet-accessories')
  //   // cy.allure().step('点击导航-女士');
  //   // cy.get('.vl-header-nav.sm-hide >ul>li>a.nav-drowMenu')
  //   //   .contains('女士')
  //   //   .click({ force: true });
  //   // cy.allure().step('点击二级导航-铆钉萌宠系列配饰');
  //   // cy.get('.nav-drowModeItem')
  //   //   .contains('铆钉萌宠系列配饰')
  //   //   .click({ force: true });

  // }
}


/**
 *从PLP点击第一个商品进入PDP
 *
 * @export
 */
export function into_pdp_from_plp(p_isMobile=0) {
  cy.allure().step('选择PLP第一个商品');
  cy.get('div.producList > div').first().click()
}


/**
 *宠物定制PDP中的一系列字母定制、照片上传、宠物名字输入等购买操作
 *
 * @export
 */
export function vip_item_operate(p_isMobile=0) {
  // cy.visit('/zh-cn/ZWPP0X612002GM?key=plpFilterParam')
  // cy.wait(1000)
  cy.allure().step('点击开始定制');
  cy.get('div.buttonStart').click();
  cy.allure().step('点击>>');
  cy.get('div.buttonStep.next').click();
  cy.allure().step('点击定制的字母');
  cy.get('div.listLetter > div').first().click();
  cy.allure().step('点击>>');
  cy.get('div.buttonStep.next').click();
  cy.allure().step('上传宠物图片1');
  cy.get('div.selectorUpload div.images-content').first().find('input[type="file"]').selectFile(Cypress.config('fixturesFolder') + '/1.png');
  cy.wait(2000)
  cy.allure().step('上传宠物图片2');
  cy.get('div.selectorUpload div.images-content:nth-of-type(2)').find('input[type="file"]').first().selectFile(Cypress.config('fixturesFolder') + '/1.png');
  cy.allure().step('填写宠物名字');
  cy.get('.petName').first().find('.inputContainer > input').type('test');
  // cy.intercept('POST', '**/upload/*').as('upload');
  cy.wait(2000);
  cy.allure().step('点击>>');
  cy.get('div.buttonStep.next').click();
  cy.allure().step('填写宠物姓');
  cy.get('.list-form').find('input[placeholder="姓"]').type('cat');
  cy.allure().step('填写宠物名');
  cy.get('.list-form').find('input[placeholder="名"]').type('dog');
  cy.allure().step('填写定制商品邮箱');
  cy.get('.list-form').find('input[placeholder="电子邮箱"]').type('111@222.com');
  cy.allure().step('勾选协议');
  cy.get('label.ace-checkbox').click();
  cy.allure().step('同意协议');
  cy.get('div.popup').contains('同意').click();
  cy.allure().step('点击立即购买');
  cy.get('div.cart-btn-wrapper').contains('立即购买').click();
  cy.wait(500);

}


/**
 *PDP中选择可用尺码
 *
 * @export
 */
export function select_enable_size(p_isMobile=0) {
  cy.allure().step('选择有库存的尺码');
  // cy.get('div.size-swiper div:not(.is-disabled)').first()
  cy.get('div.size-swiper div').not('.is-disabled').first()
    .click();
}


/**
 *PDP中选择第一个尺码
 *
 * @export
 */
export function select_first_size(p_isMobile=0) {
  cy.allure().step('选择第一个的尺码');
  cy.get('div.size-swiper div').first()
    .click({ force: true });
}


/**
 *PDP添加购物袋并去结算操作
 *
 * @export
 */
export function addcart_goto_checkout(p_isMobile=0) {
  if(p_isMobile){
    cy.allure().step('点击加购');
    cy.get('div.detail-buy-btn-mob').find('button').first().click()
    cy.allure().step('点击进入购物车页');
    cy.get('div.vl-header-fun-mode.vl-header-fun-right > a').last().click()
    cy.allure().step('点击结算');
    cy.get('div.cart-pay-menu button[type="primary"]').click()
  }else{
    cy.allure().step('点击添加至购物袋');
    cy.contains('添加至购物袋').click();
    cy.contains('查看购物袋并结算').click();
    cy.contains('结算').click();

  }
}


/**
 *从header中进入搜索到PLP的操作
 *
 * @export
 * @param {string} [value="衣"] 可传入搜索词
 */
export function search_operate(value = "衣",p_isMobile=0) {
  if(p_isMobile){
    cy.allure().step('点击放大镜');
    cy.get('div.vl-header-fun-mode.vl-header-fun-left').find('a.fun-item.hide.sm-flex-show').should('be.visible').last().click()
    cy.allure().step('输入搜索条件' + value);
    cy.get('div.ace-form-control div.inputContainer input').type(value+'{enter}')
  }else{
    cy.allure().step('点击放大镜');
    cy.get('span[class="icon iconfont fun-icon iconSEARCH"]').click();
    cy.allure().step('输入搜索条件' + value);
    cy.get('.headersearch-pc').find('.inputContainer input[type="text"]').type(value+'{enter}');
    // cy.allure().step('输入回车搜索');
    // cy.realPress('Enter');
  }

}


/**
 *PDP中将商品加入收藏夹操作
 *
 * @export
 */
export function favorite_add(p_isMobile=0) {
  cy.allure().step('校验如果已收藏则取消收藏');
  cy.get('html').then(obj=>{
    if(obj.find('a.btn-collect > img:nth-child(1)').attr('style').indexOf('display')>=0){
      cy.get('a.btn-collect > img').last().click()
    }
  })
  cy.allure().step('点击收藏');
  cy.get('a.btn-collect > img').first().click()
  cy.allure().step('校验收藏成功');
  cy.get('a.btn-collect > img:nth-of-type(2)').should("be.visible")
  return cy.get('.detail-title').should("be.visible")
}

export function into_favorite(p_isMobile=0){
  cy.allure().step('进入心愿单');
  cy.get('.icon.iconfont.fun-icon.iconxin').click();
}

/**
 *进入心愿单对比商品名称并且移除刚加入的心愿单商品
 *
 * @export
 */
export function favorite_operate(pdptitle, p_isMobile=0) {
  this.into_favorite(p_isMobile)
  cy.allure().step('检验心愿单第一个商品名称与刚才被收藏是否一致');
  cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-top > h3').should('contain', pdptitle);
  if(p_isMobile){
    cy.get('.wishlist-products').find('.wishlist-item').first().find('i.iconfont.iconARROW-RIGHT1').click();
    cy.get('.wishlist-products').find('.wishlist-item').first().find('div.list-operation-item.list-remove span').click()
  }else{
    cy.allure().step('移除心愿单商品');
    cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-delete').click();
    cy.allure().step('点击确认移除心愿单');
    cy.get('.popup-box.confirm-box').contains('确认移除').click();

  }
}

export function share_favorite(p_isMobile=0){
  this.into_favorite(p_isMobile)
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
  cy.wait(2000);
  cy.allure().step('点击同意协议');
  cy.get('.ace-checkbox-input').click();
  cy.allure().step('确认并分享');
  cy.get('div.addressButton').contains('确认并分享').click();
  cy.allure().step('校验是否弹出分享div');
  cy.get('.copyOrsave').should('be.visible');
  cy.screenshot();
  cy.allure().step('点击X关闭');
  cy.get('.icon.iconfont.iconCLOSE-WHITE').last().click();
}

// export {
//   getDateTime
// }