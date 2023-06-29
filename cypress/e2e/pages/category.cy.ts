// check category page

describe("visit category page", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env("PUBLIC_DOMAIN")}/kategorie/fruehstueck`)
    })

    // check for headline h1 & p element in header 
    it("should have h1 & p in header element", () => {
        cy.get("header")
            .find("h1")
            .should("exist")
        cy.get("header")
            .find("p")
            .should("exist")
    })

    // check for navbar
    it("should have navbar", () => {
        cy.checkNavbar()
    })

    // check for footer
    it("should have footer element", () => {
        cy.checkFooter()
    })

    // check for card container
    it("should have card container", () => {
        cy.checkCardContainer()
    })
})