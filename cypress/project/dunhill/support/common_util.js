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

//同意cookie
export function popin_tc_privacy_button(){
  cy.setCookie('TC_PRIVACY','0@002%7C3%7C6095@10@@1660096276814%2C1660096276814%2C1693792276814@')
}

// 查询陆运商品
export function icon_section(){
  cy.allure().step('点击放大镜');
  cy.get('.icon_section .iconfont.icon-SEARCH-BLACK').click();
  cy.allure().step('输入搜索条件"香水"');
  cy.focused().type('香水');
  cy.allure().step('输入回车搜索');
  cy.realPress('Enter');
}

// 查询空运商品
export function icon_section_air_transport(){
  cy.allure().step('点击放大镜');
  cy.get('.icon_section .iconfont.icon-SEARCH-BLACK').click();
  cy.allure().step('输入搜索条件"修身牛仔裤"');
  cy.focused().type('修身牛仔裤');
  cy.allure().step('输入回车搜索');
  cy.realPress('Enter');
}

//选择商品
export function goods_box(){
  cy.allure().step('选择商品');
  cy.get('div.goods_box div').first().click({force: true});
}

// 选择尺码
export function size_box(){
  cy.allure().step('选择尺码');
  cy.get('div.size_box div').first().click({force: true});
}

// 立即购买
export function buy_now(){
  cy.allure().step('点击立即购买');
  cy.contains('立即购买').click();
}

//结算页会员登录
export function checkout_member_login(){
  cy.fixture("data").then(data=>{
    cy.allure().step('点击账号密码登录');
    cy.get('div.content1').find('div.tabs_item').last().click();
    cy.allure().step('输入用户名');
    cy.get('div.content1').find('div.con').last().find('input[type="text"]').type(data.user.name);
    cy.allure().step('输入密码');
    cy.get('div.content1').find('div.con').last().find('input[type="password"]').type(data.user.password);
    cy.allure().step('点击登录');
    cy.get('div.login_btn').contains('登录').click();
    cy.wait(1000);
  })
}

// 结算页会员支付宝支付
export function checkout_page_default(p_paymethod){
  cy.log(p_paymethod);
  // cy.wait(2000)
  let pay_str = p_paymethod==null ? "支付宝" : p_paymethod; 
  cy.log(pay_str);
  cy.allure('确认礼品卡');
  cy.get('div.content1').find('div.order_com_btn').first().click();
  cy.allure('确认地址');
  cy.get('div.address-select-box').find('div.order_com_btn').click();
  cy.allure().step('确定配送方式');
  cy.get('div.order_process_item.inputting').find('div.order_com_btn').click();
  cy.allure().step('选择支付方式:' + pay_str);
  cy.contains(pay_str).click();
  cy.allure().step('确定支付方式');
  cy.get('div.padding30.order-process-step-five').find('div.order_com_btn').click();
  cy.allure().step('勾选隐私协议');
  cy.get('div.order_process_subit_box').contains(' 我已阅读、理解并同意 ').click();
  cy.allure().step('提交订单');
  cy.contains('提交订单').click();
  cy.wait(2000);
}

// 取消订单
export function cancel_order(){
  cy.visitUrl('/');
  cy.allure().step('点击登录icon');
  cy.get('.nav_icon').find('.nav_user').first().find('div').realHover();
  cy.allure().step('进入订单列表');
  cy.get('.my_layer').contains('订单').first().click();
  cy.get('.order_detail').contains('查看详情').first().click();
  cy.allure().step('点击取消订单');
  cy.get('.order_cancel').contains('取消订单').click();
  cy.allure().step('确认取消订单');
  cy.get('.box_confim').click();
  cy.wait(2000);
  cy.allure().step('检查已取消状态');
  cy.get('.order_detail').should('contain', '已取消');
}

// 登录
export function login(){
  cy.fixture("data").then(data=>{
    cy.allure().step('点击登录icon');
    cy.get('.nav_icon').find('.nav_user').first().find('div').realHover();
    cy.contains('账号密码登录').click();
    cy.allure().step('输入用户名');
    cy.get('input[placeholder="手机号码/电子邮箱 *"]').type(data.user.name);
    // cy.get('.inputContainer [type="text"][placeholder="请输入邮箱地址或11位手机号码"]')
    //   .type('13801949172');
    cy.allure().step('输入密码');
    cy.get('input[placeholder="密码 *').type(data.user.password);
    // cy.get('.inputContainer [type="password"][placeholder="请输入密码"]')
    //   .type('Aa54872843');
    // cy.allure().step('输入验证码');
    // cy.get('.longinForm.headerLogin .graphicCheckCodeInput .web-input').find('.inputContainer > input').type(data.user.verifyCode);
    // cy.get('.inputContainer [type="text"][placeholder="请输入图中所示验证码"]')
    //   .type('908234f9-3834-4398-b39a-8aa58756658e')
    cy.allure().step('点击登录');
    cy.get('div.login_btn').contains('登录').click();
    cy.wait(1000);
  })
  
}

// 进入PLP
export function into_plp(p_url){
  if(p_url){
    cy.visit(p_url);
  }
  else{
    cy.allure().step('点击导航第一个链接');
    cy.get('.vl-header-nav.sm-hide .vl-navMode li a')
      .first()
      .click({force: true});
    cy.allure().step('点击二级导航第一个链接');
    cy.get('.nav-drowModeItem a')
      .first()
      .click({force: true});
  }

}

export function into_pets_plp(){
  cy.allure().step('点击导航-女士');
  cy.get('.vl-header-nav.sm-hide >ul>li>a.nav-drowMenu')
    .contains('女士')
    .click({force: true});
  cy.allure().step('点击二级导航-铆钉萌宠系列配饰');
  cy.get('.nav-drowModeItem')
    .contains('铆钉萌宠系列配饰')
    .click({force: true});
}

export function into_pdp_from_plp(){
  cy.allure().step('点击首个商品');
  cy.get('div.productSwiper.isGridModel', { timeout: 20000 }).first()
    .click();
}

export function vip_item_operate(){
  // cy.visit('/zh-cn/ZWPP0X612002GM?key=plpFilterParam')
  cy.wait(1000)
  cy.allure().step('点击开始定制');
  cy.get('div.buttonStart').click();
  cy.allure().step('点击>>');
  cy.get('div.buttonStep.next').click();
  cy.allure().step('点击定制的字母');
  cy.get('div.listLetter > div').first().click();
  cy.allure().step('点击>>');
  cy.get('div.buttonStep.next').click();
  cy.allure().step('上传宠物图片1');
  cy.get('div.selectorUpload div.images-content').first().find('input[type="file"]').selectFile('cypress/project/vltn/fixtures/1.png');
  cy.wait(2000)
  cy.allure().step('上传宠物图片2');
  cy.get('div.selectorUpload div.images-content:nth-of-type(2)').find('input[type="file"]').first().selectFile('cypress/project/vltn/fixtures/1.png');
  cy.allure().step('填写宠物名字');
  cy.get('.petName').first().find('.inputContainer > input').type('test');
  // cy.intercept('POST', '**/upload/*').as('upload');
  cy.wait(3000);
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

export function select_enable_size(){
  cy.allure().step('选择有库存的尺码');
  cy.get('div.size-swiper div:not(.is-disabled)').first()
    .click({force: true});
}

export function select_first_size(){
  cy.allure().step('选择有库存的尺码');
  cy.get('div.size-swiper div').first()
    .click({force: true});
}

export function addcart_goto_checkout(){
  cy.allure().step('点击添加至购物袋');
  cy.contains('添加至购物袋').click();
  cy.contains('查看购物袋并结算').click();
  cy.wait(2000);
  cy.contains('结算').click();
}

export function search_operate(){
  cy.allure().step('点击放大镜');
  cy.get('span[class="icon iconfont fun-icon iconSEARCH"]').click();
  cy.allure().step('输入搜索条件"衣"');
  // cy.focused().type('1');
  cy.get('.headersearch-pc').find('.inputContainer input[type="text"]').type('衣');
  cy.allure().step('输入回车搜索');
  cy.realPress('Enter');
}

export function favorite_operate(){
  cy.get('.detail-title').then(
    obj=>{
      cy.allure().step('点击收藏');
      cy.get('a.btn-collect > img').first().click()
      cy.allure().step('校验收藏成功');
      cy.get('a.btn-collect > img:nth-of-type(2)').should("be.visible")
      cy.allure().step('进入心愿单');
      cy.get('.icon.iconfont.fun-icon.iconxin').click();
      cy.allure().step('检验心愿单第一个商品名称与刚才被收藏是否一致');
      cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-top > h3').should('contain', obj.text());
      cy.allure().step('移除心愿单商品');
      cy.get('.wishlist-products').find('.wishlist-item').first().find('.list-info-delete').click();
      cy.allure().step('点击确认移除心愿单');
      cy.get('.popup-box.confirm-box').contains('确认移除').click();
    }
  )
}

export {
  getDateTime
}