export default class DirectoryPage {
    static directoryTab() {
        return cy.get('.oxd-sidepanel-body > .oxd-main-menu > .oxd-main-menu-item-wrapper:nth-child(9) > .oxd-main-menu-item > .oxd-text');
    }
    
    static selectBox(){
        return cy.get('.oxd-select-text-input');
    }

    static listBox(){
        return cy.get('[role="listbox"]');
    }

    static getParagraph(){
        return cy.get('p');
    }

    static getEmployeeName(){
        return cy.get('[placeholder="Type for hints..."]');
    }

    static buttonFound(){ 
        return cy.get('[type="submit"]'); 
    }
}
