describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login"); // 👈 baseUrl otomatik ekleniyor
  });

  it("should render login form", () => {
    cy.contains("Login").should("exist");
    cy.get("input[type=email]").should("exist");
    cy.get("input[type=password]").should("exist");
    cy.get("button[type=submit]").should("exist");
  });

  it("should login with valid user and redirect", () => {
    cy.fixture("users").then((users) => {
      cy.get("input[type=email]").type(users.validUser.email);
      cy.get("input[type=password]").type(users.validUser.password);
      cy.get("button[type=submit]").click();

      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    });
  });

  it("should show error for invalid user", () => {
    cy.fixture("users").then((users) => {
      cy.get("input[type=email]").type(users.invalidUser.email);
      cy.get("input[type=password]").type(users.invalidUser.password);
      cy.get("button[type=submit]").click();

      cy.get(".error-message").should("contain", "Invalid email or password");
    });
  });
});
