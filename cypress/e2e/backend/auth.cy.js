describe("Auth API", () => {
  const backendUrl = Cypress.env("BACKEND_URL");

  it("should login with valid credentials", () => {
    cy.fixture("users").then((users) => {
      cy.request({
        method: "POST",
        url: `${backendUrl}/api/users/login`,
        body: {
          email: users.validUser.email,
          password: users.validUser.password,
        },
        timeout: 90000, // 90 saniye
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("token");
        expect(res.body.user).to.have.property("email", users.validUser.email);
      });
    });
  });

  it("should login with valid credentials", () => {
    cy.fixture("users").then((users) => {
      cy.request({
        method: "POST",
        url: `${backendUrl}/api/users/login`,
        body: {
          email: users.validUser.email,
          password: users.validUser.password,
        },
        timeout: 90000, // 90 saniye
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("token");
        expect(res.body.user).to.have.property("email", users.validUser.email);
      });
    });
  });
});
