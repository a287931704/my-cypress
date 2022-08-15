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



//关闭cookie弹窗
export function cookie(){
  cy.wait(5000);
  cy.allure().step('点击接受cookie');
  cy.get('#onetrust-accept-btn-handler').click();
  cy.allure().step('验证cookie关闭');
  cy.get('#onetrust-accept-btn-handler').should('not.be.visible');
}


//登录弹窗登录
export function login(){
  cy.fixture("data").then(data=>{
    cy.allure().step('点击导航');
    cy.get('.iconfont.iconsandwich-menu-usage').click({ force: true });
    cy.allure().step('点击登录icon');
    cy.wait(3000);
    cy.get('.el-drawer.ltr.classify-drawer').contains('登录').click({ force: true });
    cy.allure().step('选择密码登录');
    cy.get('.login-type>a').click();
    cy.allure().step('输入用户名');
    cy.get('.mobile-wrap.mg-b-20')
      .type(data.user.name);
    cy.allure().step('输入密码');
    cy.get('.password-wrap.mg-b-20')
      .type(data.user.password);
    cy.allure().step('点击登录');
    cy.get('.btn.btn-medium.mg-b-20').click();
    cy.wait(1000);
    cy.allure().step('验证登录成功');
    cy.get('.body.body-before-js .accountName').should('contain','Hi')
  })
}


//结算页会员登录
export function checkout_member_login(){
  cy.fixture("data").then(data=>{
    cy.wait(1000);
    cy.allure().step('选择密码登录');
    cy.get('.login-type>a').click();
    cy.allure().step('输入用户名');
    cy.get('.mobile-wrap.mg-b-20')
      .type(data.user.name);
    cy.allure().step('输入密码');
    cy.get('.password-wrap.mg-b-20')
      .type(data.user.password);
    cy.allure().step('点击登录');
    cy.get('.btn.btn-medium.mg-b-20').click();
  })
}


//结算页游客登录
export function checkout_visitor_login(){
    cy.allure().step('选择访客-继续结算');
    cy.get('.btn.medium').click();
}


//搜索商品
export function search(){
  cy.fixture("data").then(data=>{
    cy.allure().step('点击搜素icon');
    cy.get('.iconfont.iconsearch-usage').click({ force: true });
    cy.allure().step('输入要搜索的商品code');
    cy.get('.ipt-content.el-input.el-input--suffix')
      .type(data.searchcode);
    cy.allure().step('点击回车');
    cy.realPress('Enter');
    cy.wait(1000);
    cy.allure().step('验证搜索商品成功');
    cy.get('.result').should('contain','“53422-696”有1个结果');
  })
}




//导航
export function into_plp_from_navigation(){
  cy.allure().step('点击导航');
  cy.get('.iconfont.iconsandwich-menu-usage').click({ force: true });
  cy.allure().step('点击一级导航配件');
  cy.wait(3000);
  cy.get('.el-drawer.ltr.classify-drawer').contains('配饰').click();
  cy.allure().step('点击三级导航腰带');
  cy.wait(3000);
  cy.get('.el-drawer__body .second-nav-list:nth-child(1) .second-nav-item').contains('腰带').click();
  cy.allure().step('验证plp页面正确');
  cy.contains('腰带').should('have.text','腰带');
}


//plp进入pdp
export function into_pdp_from_plp(){
  cy.wait(2000);
  cy.allure().step('点击进入pdp-T Monogram 皮革腰带');
  cy.get('div.radz').contains('皮革腰带').click();
  cy.allure().step('验证pdp页面是否正确');
  cy.get('.pdpwarp .particulars-price .particulars-price-ui-2>span')
    .should('have.text','T Monogram 皮革腰带');
}


//pdp选择商品颜色和尺码
export function pdp_choose_commodity(){
  cy.allure().step('选择黑色');
  cy.get('.roundImgColor:nth-child(2)').click();
  cy.allure().step('验证是否选择黑色');
  cy.get('.pdpwarp .particulars .particulars-price-ui-5>span').should('have.text','午夜黑');
  cy.allure().step('点击请选择尺码');
  cy.get('.pdpwarp .particulars-pricemobile .select-text').click();
  cy.allure().step('点击XS');
  cy.get('.pdpwarp .particulars-pricemobile .el-select-dropdown__item:nth-child(2)').click();
  cy.allure().step('验证是否选择XS');
  cy.get('.pdpwarp .particulars-pricemobile .text').should('have.text','XS');
  
}


//pdp加入购物车
export function pdp_add_to_cart(){
  cy.allure().step('点击加入购物车');
  cy.wait(1000);
  cy.get('.pdpwarp .particulars-pricemobile .btn.btn-medium:nth-child(1)').click();
  cy.allure().step('验证加购成功');
  cy.wait(3000);
  cy.get('.tabbarMobile').should('have.text','1');
}



//pdp立即购买
export function pdp_buy_now(){
  cy.allure().step('点击立即购买');
  cy.wait(1000);
  cy.get('.pdpwarp .particulars-pricemobile .btn.btn-medium:nth-child(2)').click();
}


//进入购物车
export function into_shoppingcart(){
  cy.allure().step('点击购物袋icon');
  cy.get('.iconfont.iconbag-usage').click();
  cy.allure().step('点击确认订单');
  cy.get('.calculate-btn').click();
}


//购物车立即购买
export function shoppingcart_to_checkout(){
  cy.wait(2000)
  cy.allure().step('点击立即购买');
  cy.get('.mini-cart-foot .btn.btn-medium.closeAn').click();
}


//会员结算页（确认地址）
export function checkout_member_part1(){
  cy.wait(1000)
  cy.allure().step('验证地址是否存在');
  cy.get('.address-item.mg-b-30.active .name').should('contain','自动化测试');
  cy.allure().step('点击下一步');
  cy.wait(1000)
  cy.get('.btn.large').contains('下一步').should('be.visible').click();

}



//游客结算页地址
export function checkout_visitor_part1(){
  cy.fixture("data").then(data=>{
    cy.wait(1000)
    cy.allure().step('输入姓名');
    cy.get('.name-phone.mg-b-30 .name-wrap').type(data.visitor.name);
    cy.allure().step('收入手机号');
    cy.get('.name-phone.mg-b-30 .phone-wrap').type(data.visitor.phone);
    cy.allure().step('选择省份');
    cy.get('.float-clearfix.city-select.flex .item.province.placeholder-visible:nth-child(1)').click();
    cy.allure().step('选择安徽省');
    cy.get('.item.province.placeholder-visible:nth-child(1) .el-select-dropdown__item').contains('安徽省').click();
    cy.wait(1000)
    cy.allure().step('选择市');
    cy.get('.float-clearfix.city-select.flex .item.province.placeholder-visible:nth-child(2)').click();
    cy.allure().step('选择阜阳市');
    cy.get('.item.province.placeholder-visible:nth-child(2) .el-select-dropdown__item').contains('阜阳市').click();
    cy.wait(1000)
    cy.allure().step('选择区县');
    cy.get('.float-clearfix.city-select.flex .item.province.placeholder-visible:nth-child(3)').click();
    cy.allure().step('选择临泉县');
    cy.get('.item.province.placeholder-visible:nth-child(3) .el-select-dropdown__item').contains('临泉县').click();
    cy.allure().step('填写详细地址');
    cy.get('.el-form .region-wrap.mg-b-30:nth-child(3) .input-temp.large').type(data.visitor.address);
    cy.wait(1000)
    cy.allure().step('点击下一步');
    cy.get('.btn.large').contains('下一步').should('be.visible').click();
  })
}



//结算页提交订单
export function checkout_part2(){
    cy.allure().step('勾选隐私协议');
    cy.get('.server-wrap  .el-checkbox__inner').click();
    cy.allure().step('提交订单');
    cy.get('.submit .btn.large').contains('提交订单').click();
}




//支付（花呗）
export function payment_huabei(){ 
  cy.allure().step('选择支付方式:花呗');
  cy.get('.el-radio.pay-type-item.icohuabeiImg .pay-icon>span').contains('花呗分期').click();
  cy.allure().step('选择分6期');
  cy.get('.huabei>div:nth-child(2) .figure').contains('6').click();
}


//支付（微信）
export function payment_weixin(){
  cy.wait(1000)
  cy.allure().step('选择支付方式:微信');
  cy.get('.el-radio.pay-type-item.payTypeItemWeixinEight .pay-icon>span').contains('微信支付').click();
}





//会员取消订单
export function member_cancel_order(){
  cy.wait(1000)
  cy.visitHomepage();
  cy.allure().step('hover登录icon');
  cy.get('.iconfont.iconuser-usage.gray50').realHover();
  cy.allure().step('点击我的订单');
  // cy.get('.head-account-list>li:nth-child(2)>a').contains('我的订单').click();
  cy.get('ul.head-account-list').find('a').eq(1).click({force:true});
  cy.allure().step('点击最新订单详情');
  cy.get('.empty-2-01 .logistics-span').contains('查看详情').click();
  cy.allure().step('点击确定-取消订单');
  cy.wait(2000)
  cy.get('.btn.btn-medium.btn-active.btn-bd').click();
  cy.allure().step('检查已取消状态');
  cy.get('.over-time-3').should('have.text','已取消');
}


//游客获取订单号
export function ordercode(){
  cy.wait(2000);
  cy.allure().step('获取订单code');
  return cy.get('.order-number').should('be.visible')
}


//游客取消订单
export function visitor_cancel_order(code){
  cy.fixture("data").then(data=>{
    cy.wait(1000);
    cy.visitHomepage();
    cy.allure().step('点击订单状态');
    cy.contains('订单状态').click();
    cy.allure().step('输入订单号');
    cy.get('.query-order .el-form-item__content .el-input__inner').first().type(code.text().substring(5));
    cy.allure().step('输入手机号');
    cy.get('.query-order .el-form-item__content .el-input__inner').last().type(data.visitor.phone);
    cy.allure().step('点击提交');
    cy.get('.btn.large').click();
    cy.wait(2000);
    cy.allure().step('点击确定-取消订单');
    cy.get('.btn.btn-medium.btn-active.btn-bd').click();
    cy.allure().step('检查已取消状态');
    cy.get('.over-time-3').should('have.text','已取消');
  })
}



//登出
export function log_off(){
  cy.visitHomepage();
  cy.allure().step('hover登录icon');
  cy.get('.iconfont.iconuser-usage.gray50').realHover();
  cy.allure().step('点击登出');
  cy.get('.head-account-list>li:nth-child(5)').contains('登出').click();
  cy.wait(2000)
  cy.allure().step('检查登出状态');
  cy.get('.pd-l-10.gray50').should('not.exist');
}
  



export {
  getDateTime
}