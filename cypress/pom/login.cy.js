export default class LoginPage {
    static verifyLoginPage(){ 
        return cy.get('h5').contains('Login').should('be.visible'); 
    }
    static inputUsername() { 
        return cy.get('[name="username"]'); 
    }
    static inputPassword(){ 
        return cy.get('[name="password"]'); 
    }
    static buttonLogin(){ 
        return cy.get('[type="submit"]'); 
    }
    static dashboardPage(){ 
        return cy.get('h6').contains('Dashboard'); 
    }
    static dashboardPageInvalid(){ 
        return cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text'); 
    }
    static dashboardPageRequired(){ 
        return cy.get('.oxd-input-field-error-message'); 
    }
}