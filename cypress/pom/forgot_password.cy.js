export default class ForgotPasswordPage {
    static verifyForgotPasswordPage(){ 
        return cy.get('h6').contains('Reset Password').should('be.visible'); ; 
    }
    static inputUsername() { 
        return cy.get('[name="username"]'); 
    }
    static fieldErrorMessageRequired(){
        return cy.get('span.oxd-input-field-error-message')
            .contains('Required');
    }
    static buttonCancel(){ 
        return cy.get('[type="button"]'); 
    }
    static buttonResetPassword(){ 
        return cy.get('[type="submit"]'); 
    }
    static dashboardResetPassword(){
        return cy.get('h6').contains('Reset Password link sent successfully');
    }
    static BackLoginPage(){ 
        return cy.get('h5').contains('Login'); 
    }
}