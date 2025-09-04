describe("Auth API", () => {
  const backendUrl = Cypress.env("BACKEND_URL");

  it("should login with valid credentials", () => {
    cy.fixture("users").then((users) => {
      cy.request("POST", `${backendUrl}/api/users/login`, {
        email: users.validUser.email,
        password: users.validUser.password,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("token");
        expect(res.body.user).to.have.property("email", users.validUser.email);
      });
    });
  });

  it("should reject invalid credentials", () => {
    cy.fixture("users").then((users) => {
      cy.request({
        method: "POST",
        url: `${backendUrl}/api/users/login`,
        body: users.invalidUser,
        failOnStatusCode: false, // ❗️ Hata bekleniyor
      }).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body).to.have.property(
          "message",
          "Invalid email or password"
        );
      });
    });
  });
});
