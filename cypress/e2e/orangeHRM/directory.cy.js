/// <reference types= "cypress" />
import DirectoryPage from "../../pom/directory.cy";
import LoginPage from "../../pom/login.cy";

describe('Testing Directory Menu ', () => {
    it('Directly Menu', () => {
        // Step 1 > Login Dashboard OrangeHRM
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        LoginPage.inputUsername().type('Admin');
        LoginPage.inputPassword().type('admin123');

        cy.intercept('GET', '**/action-summary').as('actionSummary');

        LoginPage.buttonLogin().click();
        cy.wait('@actionSummary');

        LoginPage.dashboardPage().should('have.text', 'Dashboard');
        
        // Step 2 > Klik Menu Directory
        DirectoryPage.directoryTab().should('be.visible').click();

        // Step 3 > Search Data Employee
        DirectoryPage.getEmployeeName().type('Peter');
        DirectoryPage.listBox().contains('Peter Mac Anderson').click();

        DirectoryPage.selectBox().eq(0).click();
        DirectoryPage.listBox().contains('Chief Financial Officer').click();

        DirectoryPage.selectBox().eq(1).click();
        DirectoryPage.listBox().contains('New York Sales Office').click();

        cy.intercept('GET', '**/employees?limit=14&offset=0&locationId=2&empNumber=3&jobTitleId=2').as('FoundEmployee');
        DirectoryPage.buttonFound().click();
        cy.wait('@FoundEmployee');

        //Step 4 > Menampilkan data employee "Peter Mac Anderson"
        DirectoryPage.getParagraph().contains('Peter Mac Anderson');
        DirectoryPage.getParagraph().contains('Chief Financial Officer');
        DirectoryPage.getParagraph().contains('New York Sales Office');
        
    });
});

