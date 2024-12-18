/// <reference types= "cypress" />
import ForgotPasswordPage from "../../pom/forgot_password.cy";

describe('TC_ForgotPassword_01 - Forgot Password dengan kredensial valid', () => {
    it('TC_ForgotPassword_01_01 - Forgot dengan username benar', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
      ForgotPasswordPage.verifyForgotPasswordPage().should('have.text','Reset Password').should('be.visible');
      ForgotPasswordPage.inputUsername().type('Admin');
      
      cy.intercept('GET', '**/sendPasswordReset').as('actionPasswordReset');

      ForgotPasswordPage.buttonResetPassword().click();
      cy.wait('@actionPasswordReset');
      ForgotPasswordPage.dashboardResetPassword().should('have.text','Reset Password link sent successfully');
    });
  });

  describe('TC_ForgotPassword_02 - Forgot Password dengan kredensial tidak valid', () => {
    it('TC_ForgotPassword_02_01 - Forgot dengan username kosong', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
      ForgotPasswordPage.verifyForgotPasswordPage().should('have.text','Reset Password');
      ForgotPasswordPage.inputUsername().clear();

      ForgotPasswordPage.buttonResetPassword().click();
      ForgotPasswordPage.fieldErrorMessageRequired().should('have.text', 'Required');
    });
  });

  describe('TC_ForgotPassword_03 - Batalkan Forgot Password', () => {
    it('TC_ForgotPassword_03_01 - Batalkan Forgot Password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
      ForgotPasswordPage.verifyForgotPasswordPage().should('have.text','Reset Password');

      cy.intercept('GET', '**/login').as('actionLogin');

      ForgotPasswordPage.buttonCancel().click();
      cy.wait('@actionLogin');
      ForgotPasswordPage.BackLoginPage().should('be.visible');
    });
  });