import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {

  beforeEach(() => {
    cy.mount(<Footer lang="de" />)
  })

  it("should have 10 links", () => {
    cy.get("a")
      .should("have.length", 10)
  })

  it("should have about-me link", () => {
    cy.get("footer")
      .find("a[href='/ueber-mich']")
      .should("exist")
  })

  it("should have contact link", () => {
    cy.get("footer")
      .find("a[href='/kontakt']")
      .should("exist")
  })
  it("should have impressum link", () => {
    cy.get("footer")
      .find("a[href='/impressum']")
      .should("exist")
  })
  it("should have data privacy link", () => {
    cy.get("footer")
      .find("a[href='/datenschutz']")
      .should("exist")
  })

  it("should have newsletter input type email", () => {
    cy.get("form")
      .find("input[type='email']")
      .should("exist")
  })

  it("should have newsletter submit button", () => {
    cy.get("form")
      .find("button")
      .should("exist")
  })
})