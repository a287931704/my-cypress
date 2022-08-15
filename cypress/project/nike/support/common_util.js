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
// 登陆操作
export function login(){
  cy.fixture("data").then(data=>{
  cy.allure().step('访问特殊登陆页面');
  cy.visit(data.url_login);
  cy.allure().step('输入用户用');
  cy.get('#username').type(data.user.name);
  cy.allure().step('输入密码');
  cy.get('#pswKey').type(data.user.password);
  cy.allure().step('点击登陆');
  cy.get('a.btn-org.btn146.fLeft').click();
  cy.allure().step('判断是否登陆成功');
  cy.contains('我的帳戶').should('be.visible')
})
}

// 获取cookies
export function cancel_order(){
  cy.getCookies()
  .should('exist')
  .then((cookies) =>{
    cy.log(cookies)
    cy.allure().step('访问订单列表页');
    cy.visit('/mynike/treamentorder.htm')
    cy.allure().step('提取第一个订单orderid');
    cy.get('#mCSB_1_container').find('.dispose-indent-content').eq(0).find('.all_per_click_order').find('a').invoke('attr','soid').as('orderid');
    cy.get('@orderid').then((value) =>{
      cy.log(value)
      cy.request({
        method:'post',
        url:'/mynike/checkLimited.json',
        headers:{
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With':'XMLHttpRequest',
          'request-from':'akamai',
          'authorization':'Basic bmlrZWhrc3RhZ2U6NjY2TklLRUhLODg4',
          'Cookie':cookies 
        },
        body:{
          'soId':value
        }
       })
      // 确认取消订单
        cy.request({
        method:'post',
        url:'/mynike/cancelOrder.htm',
        headers:{
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With':'XMLHttpRequest',
          'request-from':'akamai',
          'authorization':'Basic bmlrZWhrc3RhZ2U6NjY2TklLRUhLODg4',
          'Cookie':cookies 
        },
        body:{
          'cancelReason':'產品選擇錯誤',
          'orderId':value
        }
      })
    })
    
  })
}


// 访问PDP
export function PDP(){
  cy.fixture("data").then(data=>{
  cy.allure().step('打开PDP');
  cy.visit(data.url_sku_pdp);
  cy.allure().step('选择尺码');
  cy.contains('1SIZE').click();
  cy.allure().step('点击加入购物车');
  cy.get('.if-you-like > span').click();
  cy.allure().step('点击查看购物车');
  cy.get('.button.reverse').click();

})
}

//会员购物车点结算
export function shopcart_check(){
  cy.allure().step('购物车点击结算');
  cy.get('#goToCheckButton').click();
}

// 会员QS PDP点结算
export function qs_pdp_check(){
  cy.fixture("data").then(data=>{
    cy.allure().step('打开PDP');
    cy.visit(data.url_qs_pdp);
    cy.allure().step('选择尺码');
    cy.contains('1SIZE').click();
    cy.allure().step('点击结算');
    cy.get('.if-you-like-qs > span').click();
  })

}

// 游客购物车点结算
export function shopcart_guest_check(){
  cy.allure().step('游客购物车点结算')
  cy.get('#guestGoToCheckButton').click()
}
// 关闭疫情弹窗
export function checkout_pop(p_pop=0){
  cy.get('body').then($el => {
    if($el.find('查找疫情弹窗')){
      cy.allure().step('查找是否有疫情弹窗');
      cy.get('.uni-layer.dialog-order.show').find('.success-common.btn-close').eq(0).click()
    }
    else{
      cy.allure().step('如无弹窗直接下一步');
      return
    }
  })
}

// 选择信用卡支付
export function GLOBALPAY(){
  cy.allure().step('点击更换支付方式');
  cy.get('#payment_change').click();
  cy.allure().step('选择信用卡');
  cy.get('.payment-list').find('.bank').contains('信用卡').click()
  cy.allure().step('点击确认选择');
  cy.get('#paymentEditBtn > p > .btn-org').click();
}

// 选择AlipayHK支付
export function ALIPAYHK(){
  cy.allure().step('点击更换支付方式');
  cy.get('#payment_change').click();
  cy.allure().step('选择AlipayHK支付');
  cy.get('.payment-list').find('.bank').contains('AlipayHK').click()
  cy.allure().step('点击确认选择');
  cy.get('#paymentEditBtn > p > .btn-org').click();
}

// 选择銀聯支付
export function UNIONPAY(){
  cy.allure().step('点击更换支付方式');
  cy.get('#payment_change').click();
  cy.allure().step('选择銀聯支付');
  cy.get('.payment-list').find('.bank').contains('銀聯').click()
  cy.allure().step('点击确认选择');
  cy.get('#paymentEditBtn > p > .btn-org').click();
}
// 选择支付寶支付
export function ALIPAYCN(){
  cy.allure().step('点击更换支付方式');
  cy.get('#payment_change').click();
  cy.allure().step('选择支付寶支付');
  cy.get('.payment-list').find('.bank').contains('支付寶').click()
  cy.allure().step('点击确认选择');
  cy.get('#paymentEditBtn > p > .btn-org').click();
}

// 选择其他手機支付平台支付
export function QFPAY(){
  cy.allure().step('点击更换支付方式');
  cy.get('#payment_change').click();
  cy.allure().step('选择其他手機支付平台支付');
  cy.get('.payment-list').find('.bank').contains('其他手機支付平台').click()
  cy.allure().step('点击确认选择');
  cy.get('#paymentEditBtn > p > .btn-org').click();
}

//提交订单
export function checkout(){
  cy.allure().step('勾选隐私条款');
  cy.get('#order_check_out').click();
  cy.allure().step('点击确定提交订单');
  cy.get('#createOrderButton').click();
}

// QS创单成功断言
export function qs_order_affirm(){
  cy.allure().step('查看是否创单成功');
  cy.contains('排隊成功，立即支付。').should('be.visible')
}


//选择自提点结算
export function o2o_check(){
  cy.allure().step('点击更改');
  cy.get('#shippingInfo_change').click();
  cy.allure().step('选择自取');
  cy.get('#changePickUp > span').click();
  cy.allure().step('点击保存');
  cy.get('#checkout_pickup_modify > .default-btn-wrap > p > .btn-org').click();
}

// 游客选择自提点结算

export function guest_o2o_check(){
  cy.allure().step('点击自取');
  cy.get('#changePickUp').click();
  cy.allure().step('点击保存');
  cy.get('.checkSelfPickUp.btn-gray_y btn130 ').click();
}


// 结算页填写收件信息
export function guest_checkout_add(){
  cy.fixture("data").then(data=>{
  cy.allure().step('输入收件人')
  cy.get('#addDeliveryNameInput').type(data.address.add_name)
  cy.allure().step('输入手机号')
  cy.get('#mobile').type(data.address.add_mobile)
  cy.allure().step('输入Email')
  cy.get('#addDeliveryEmailInput').type(data.address.add_email)
  cy.contains('香港島').click({ force: true })
  cy.contains('中西區').click({ force: true })
  cy.get('#addDeliveryAddressInput').type(data.address.add_delivery)
})
}
// 游客选择支付方式
export function guest_checkout_payment(){
  cy.allure().step('选择信用卡支付')
  cy.get('.payment-list').find('.bank').contains('信用卡').click()

}

// 修改个人信息
export function my_profile(){
  cy.allure().step('点击我的账户')
  cy.contains('帳戶設置').click( {force: true })
  cy.allure().step('修改名字')
  cy.get('#firstName').clear().type('先生')
  cy.allure().step('修改姓')
  cy.get('#lastName').clear().type('魏')
  cy.allure().step('点击性别')
  cy.get('#man').click()
  cy.allure().step('点击保存')
  cy.get('#idCommit').click()
  cy.allure().step('检查资料已更新')
  cy.contains('資料已更新').should('be.visible')
}

// 搜索
export function search(){
  cy.allure().step('关闭登陆弹窗');
  cy.get('#guestLogin > span').click( {force: true });
  cy.allure().step('搜索鞋子点击回车');
  cy.get('#keyword').type('鞋子').type('{enter}');
  cy.allure().step('滑动页面');
  cy.scrollTo(0,8000);
  // 判断商品大于60个
  cy.allure().step('判断商品数量大于60个');
  cy.get('.style_liborder_new.swiper-slide').should('have.length.above',60);
}


// 地址增删改查
export function my_address(){
  cy.fixture("data").then(data=>{
  cy.allure().step('点击我的訂單')
  cy.contains('我的訂單').click({ force: true })
  cy.allure().step('点击收貨地址')
  cy.get(':nth-child(7) > a > span').click({ force: true })
  cy.allure().step('点击新增地址')
  cy.contains('新增地址').click()
  cy.allure().step('输入收件人信息')
  cy.get('#name').type(data.address.add_name)
  cy.get('#mobile').type(data.address.add_mobile)
  cy.get('#email').type(data.address.add_email)
  cy.contains('香港島').click({ force: true })
  cy.contains('中西區').click({ force: true })
  cy.get('#addressTextarea').type(data.address.add_delivery)
  cy.allure().step('点击保存')
  cy.get('#commitSoc').click()
  cy.allure().step('判断地址新增是否成功')
  cy.get('.address-list-box').contains('自动化测试').should('be.visible')
  cy.allure().step('点击删除地址')
  cy.get('.address-list-box').find('.del.events-remove-address').contains('刪除').click()
  cy.get('.remove-btn').click()
  cy.allure().step('判断地址是否删除成功')
  cy.get('.address-list-box').should('not.contain','自动化测试')
  })

}

// 收藏
export function my_favorites(){
  cy.fixture("data").then(data=>{
  cy.allure().step('访问收藏');
  cy.visit(data.url_favorites)
  cy.get('.goods_name').then($el => {
    if($el.find('測試專用商品')){
      cy.allure().step('查找是否有：測試專用商品');
      cy.contains('NIKE HK 測試專用商品').should('be.visible');
      cy.allure().step('如有点击删除');
      cy.get('.share-list-goods').eq(0).contains('刪除收藏').click();
      cy.allure().step('点击确认删除');
      cy.get('#confirmbtn2').click();
    }
    else{
      cy.allure().step('如没有执行下一步操作');
      return
    } 
  })
  cy.allure().step('查找是否有：測試專用商品');
  cy.get('.share-list-goods').eq(0).should('not.contain','測試專用商品');
  cy.allure().step('访问PDP');
  cy.visit(data.url_sku_pdp);
  cy.allure().step('点击收藏');
  cy.get('.if-you-like > div').click();
  cy.allure().step('判断是否收藏成功');
  cy.contains('查看收藏').should('be.visible');
})

}

export {
  getDateTime
}