/// <reference types="cypress" />

// check navbar
Cypress.Commands.add("checkNavbar", () => {
    cy.get(".navbar")
        .should("exist")

    cy.get(".navbar")
        .find("nav")
        .should("exist")

    // check for main links
    cy.get(".navbar")
        .find("a")
        .should("have.length.at.least", 6)

    cy.get(".navbar")
        .find("a[href='/']")
        .should("exist")

    cy.get(".navbar")
        .find("a[href='/rezepte']")
        .should("exist")

    cy.get(".navbar")
        .find("a[href='/blog']")
        .should("exist")

    cy.get(".navbar")
        .find("a[href='/reisen']")
        .should("exist")

    cy.get(".navbar")
        .find("a[href='/ueber-mich']")
        .should("exist")

    cy.get(".navbar")
        .find("a[href='/kontakt']")
        .should("exist")

    // search link
    cy.get(".navbar")
        .find("a[href='/suche']")
        .should("exist")

    // check for language switch
    cy.get(".navbar")
        .find("a")
        .contains("DE/EN")
        .should("exist")

    // check for hamburger menu
    cy.get(".navbar")
        .find("button")
        .find("svg")
        .should("exist")

    // check social share links 6x mobile nav, 6x desktop nav
    cy.get(".navbar")
        .find("a[rel='noopener noreferrer']")
        .should("have.length", 12)
})

// check footer
Cypress.Commands.add("checkFooter", () => {
    cy.get("body")
        .find("footer")
        .should("exist")
})

// check card container

Cypress.Commands.add("checkCardContainer", () => {
    cy.get("main")
        .find("ul")
        .find("li")
        .find("a")
        .should("exist")
})

export { };

declare global {
    namespace Cypress {
        interface Chainable {
            checkNavbar(): Chainable<void>
            checkFooter(): Chainable<void>
            checkCardContainer(): Chainable<void>
        }
    }
}