// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//访问首页，传入设备类型以模拟移动端
Cypress.Commands.add('visitHomepage',(device_type)=>{
  cy.fixture('data').then(data=>{
    cy.allure().label('tag', Cypress.env('environment'));
    Cypress.config({baseUrl:data.url})
    if(device_type){
      cy.viewport(device_type);
    }
    
    cy.visit('/', {
      auth: data.cert,
      headers: {
        "Accept":"application/json, text/plain, */*",
        "user-agent": "axios/0.18.0",
    },
    });
  })
})

//访问首页，传入设备类型以模拟移动端
Cypress.Commands.add('visitUrl',(url,device_type)=>{
  cy.fixture('data').then(data=>{
    cy.allure().label('tag', Cypress.env('environment'));
    Cypress.config({baseUrl:data.url})
    if(device_type){
      cy.viewport(device_type);
    }
    
    cy.visit(url, {
      auth: data.cert,
      headers: {
        "Accept":"application/json, text/plain, */*",
        "user-agent": "axios/0.18.0",
    },
    });
  })
})

//滚动到网站底部
Cypress.Commands.add("ScrollToBottom", () => {
  cy.scrollTo('bottom');
  // cy.document().then(() => {
  //   window.scrollTo(0, document.documentElement.offsetHeight);
  // });
});

// Cypress.Commands.add('visitHomepage_mob',(device_type)=>{
//     cy.fixture('data').then(data=>{
//         Cypress.config({baseUrl:data.url})
//         cy.viewport(device_type)
//         cy.visit('/')
//       })
// })