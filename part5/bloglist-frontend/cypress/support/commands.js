// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createBlogAndRefresh", function(title, author, url, baseUrl) {
	cy.contains("new note").click();

	cy.get("#title").type(title);
	cy.get("#author").type(author);
	cy.get("#url").type(url);
	cy.get("button[type=submit]").click();

	cy.visit(baseUrl);
});

Cypress.Commands.add("loginAndSaveDetailsToLS", function(username, password, baseUrl, userKeyLS) {
	cy.request("POST", baseUrl + "api/login", {username, password})
	  .then(res => window.localStorage.setItem(userKeyLS, JSON.stringify(res.body)));
});