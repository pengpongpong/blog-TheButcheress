import React from 'react'
import Socials from './Socials'

describe('<Socials />', () => {
  beforeEach(() => {
    cy.mount(<Socials />)
  })

  it("should have 6 links", () => {
    cy.get("a")
      .should("have.length", 6)
  })

  it("should have img in anchor", () => {
    cy.get("a")
      .find("img")
      .should("exist")
  })
})