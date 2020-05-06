describe("Blog app", function () {
  before(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  after(function () {
    cy.visit("http://localhost:3000");
    cy.get("#logout-button").click();
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("A blog can be created and removed", function () {
      cy.get("#create-new-blog").click();
      cy.get("#title").type("sample-title");
      cy.get("#author").type("sample-author");
      cy.get("#url").type("sample-url");
      cy.get("#create-new-blog-button").click();
      cy.contains("blogs");
      cy.contains("sample-title");
      cy.contains("sample-author");

      cy.get("#view-blog-button").click();
      cy.get("#remove-button").click();
      cy.on("window:confirm", (str) => {
        expect(str === "Remove blog sample-title by sample-author").to.be.true;
        return true;
      });
      cy.visit("http://localhost:3000");
      // cy.get("sample-title").to.eq(undefined);
      // cy.not.contains("sample-author");
    });
  });
});
