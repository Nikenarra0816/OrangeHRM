/// <reference types= "cypress" />
import LoginPage from "../../pom/login.cy";

describe('TC_Login_01 - Login dengan kredensial valid', () => {
    it('TC_Login_01_01 - Login dengan username dan password benar', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.verifyLoginPage().should('have.text','Login').should('be.visible');;
      LoginPage.inputUsername().type('Admin');
      LoginPage.inputPassword().type('admin123');
  
      cy.intercept('GET', '**/action-summary').as('actionSummary');

      LoginPage.buttonLogin().click();
      cy.wait('@actionSummary');
      LoginPage.dashboardPage().should('have.text','Dashboard');
    });
  });

  describe('TC_Login_02 - Login dengan kredensial tidak valid', () => {
    it('TC_Login_02_01 - Login dengan username salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().type('admin123');
      LoginPage.inputPassword().type('admin123');
  
      cy.intercept('GET', '**/login').as('actionLogin');

      LoginPage.buttonLogin().click()
      cy.wait('@actionLogin');
      LoginPage.dashboardPageInvalid().should('have.text','Invalid credentials');
    });

    it('TC_Login_02_02 - Login dengan password salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().type('Admin');
      LoginPage.inputPassword().type('123@admin');
  
      cy.intercept('GET', '**/login').as('actionLogin');

      LoginPage.buttonLogin().click()
      cy.wait('@actionLogin');
      LoginPage.dashboardPageInvalid().should('have.text', 'Invalid credentials');
    });

    it('TC_Login_02_03 - Login dengan username & password salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().type('nikenarra');
      LoginPage.inputPassword().type('nikenarra12');

      cy.intercept('GET', '**/login').as('actionLogin');
  
      LoginPage.buttonLogin().click()
      cy.wait('@actionLogin');
      LoginPage.dashboardPageInvalid().should('have.text', 'Invalid credentials');
    });

  });

  describe('TC_Login_03 - Login dengan kredensial kosong', () => {
    it('TC_Login_03_01 - Login tanpa memasukan username', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().clear();
      LoginPage.inputPassword().type('admin123');
  
      LoginPage.buttonLogin().click();
      LoginPage.dashboardPageRequired().should('have.text', 'Required');
    });

    it('TC_Login_03_02 - Login tanpa memasukan password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().type('Admin');
      LoginPage.inputPassword().clear();
  
      LoginPage.buttonLogin().click();
      LoginPage.dashboardPageRequired().should('have.text', 'Required');
    });

    it('TC_Login_03_03 - Login tanpa memasukan username dan password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().clear();
      LoginPage.inputPassword().clear();
  
      LoginPage.buttonLogin().click();
      LoginPage.dashboardPageRequired()
        .contains('Required')
        .should('have.length', 1);
    });
  });

  describe('TC_Login_04 - Login dengan kredensial tidak terdaftar', () => {
    it('TC_Login_04_01 - Login dengan kredensial tidak terdaftar', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      LoginPage.inputUsername().type('cantik');
      LoginPage.inputPassword().type('cantik');

      cy.intercept('GET', '**/login').as('actionLogin');

      LoginPage.buttonLogin().click();
      cy.wait('@actionLogin');
      LoginPage.dashboardPageInvalid().should('have.text','Invalid credentials');
    });
  });