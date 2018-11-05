context("Test the demo app", () => {
  beforeEach(() => {
    cy.visit("/demo.html");
  });

  describe("Demo page", () => {
    it("renders WindowShade component", () => {
      cy.get("#window-shade").should("contain", "Theory & Background");
    });
  });
});
