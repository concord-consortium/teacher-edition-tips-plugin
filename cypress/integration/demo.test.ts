const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;

// Handles rando `Uncaught Error: ResizeObserver loop limit exceeded`
// which sometimes shows up in travis
// see: https://github.com/quasarframework/quasar/issues/2233
Cypress.on("uncaught:exception", (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  }
});

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
