// check blogs page

describe("visit all blogs page", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env("PUBLIC_DOMAIN")}/de/blog`)
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

    it("should have h1 element", () => {
        cy.get("header")
            .find("h1")
            .should("exist")
    })
})