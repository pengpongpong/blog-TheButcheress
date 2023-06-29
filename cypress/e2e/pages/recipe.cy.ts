// check recipes page

describe("visit recipe page", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env("PUBLIC_DOMAIN")}/de/rezepte/pancake`)
    })

    // main sections
    it("should have 4 sections", () => {
        cy.get("main")
            .find("section")
            .should("have.length", 4)
    })

    // social share links
    it("should have 6 links for social share", () => {
        cy.get("section")
            .find("ul")
            .find("a")
            .should("have.length", 6)
    })

    // main image
    it("should have main image", () => {
        cy.get("picture")
            .find("img")
            .should("have.attr", "width")
    })

    // check for cooking timer

    it("should view cooking time", () => {
        cy.get("div")
            .find("p")
            .contains("Vorbereitung")

        cy.get("div")
            .find("p")
            .contains("Gesamt")

        cy.get("div")
            .find("p")
            .contains("Portionen")
    })

    // check instruction steps
    it("should have instruction steps", () => {
        cy.get(".MuiStepper-root")
            .should("exist")
        cy.get(".MuiStep-root")
            .should("exist")
    })

    // check ingredients list
    it("should have ingredient list", () => {
        cy.get("section")
            .find("h2")
            .contains("Zutaten")
            .should("exist")

        cy.get("section")
            .find("table")
            .should("exist")

    })
})