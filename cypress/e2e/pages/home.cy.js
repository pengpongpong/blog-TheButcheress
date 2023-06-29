// check home page

describe("visit home page", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env("PUBLIC_DOMAIN")}`)
    })

    // check for headline h1
    it("should have h1 element", () => {
        cy.get("h1")
            .should("exist")
    })

    // check for navbar
    it("should have navbar", () => {
        cy.checkNavbar()
    })

    // check for image-slider swiper
    it("should have image-slider", () => {
        cy.get(".swiper")
            .find("img")
            .should("exist")

        cy.get(".swiper")
            .find(".swiper-wrapper")
            .should("exist")

        cy.get(".swiper")
            .find(".swiper-button-prev")
            .should("exist")

        cy.get(".swiper")
            .find(".swiper-button-next")
            .should("exist")
    })

    // check for all 3 section elements
    it("should have 3 section element", () => {
        cy.get("main")
            .find("section")
            .should("have.length", 3)
    })

    // check for correct href link in section elements
    it("should have 3 anchors with href within sections", () => {
        const expectedHref = ['de/ueber-mich', 'de/rezepte', 'de/reisen']

        cy.get('section').each((section, index) => {
            cy.wrap(section)
                .find('a')
                .each((anchor) => {
                    const href = Cypress.$(anchor).attr('href')
                    cy.wrap(anchor).should('have.attr', 'href', expectedHref[index])
                })
        })
    })

    // check for footer
    it("should have footer element", () => {
        cy.checkFooter()
    })
})