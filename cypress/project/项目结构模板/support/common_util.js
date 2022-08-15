/*
此文件用于封装公共模块用例
建议将可共用并且将重复调用的模块拆分到此处，成为能够兼容同一个业务流程中不同的业务场景的方法
*/
export function test_function(p_value){
  cy.log(p_value);
}
