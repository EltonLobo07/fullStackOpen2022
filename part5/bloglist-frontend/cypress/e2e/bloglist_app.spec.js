describe("Blog app", function() {
	const username = "Mystic07", password = "test123", name = "Elton Lobo", userKeyLS = "loggedInUser";
	const baseUrl = "http://localhost:3000/"; 

	beforeEach(function() {
		// Clear all entries from both the collections (users & blogs)
		cy.request("POST", baseUrl + "api/testing/reset");

		// Create a new user
		cy.request("POST", baseUrl + "api/users", {username, password, name});

		// Refresh the page
		cy.visit(baseUrl);
	});

	it("Login form is displayed", function() {

		// Check if the username field is present
		cy.get("#usernameField");

		// Check if the password field is present
		cy.get("#passwordField");

		// Check if the "login" button is present
		cy.get("button").contains("login");
	});	

	describe("Login", function() {
		it("succeeds with correct credentials", function() {
			// username & password variables are declared in the outermost describe block

			// Type the value present in the username variable inside username field
			cy.get("#usernameField").type(username);

			// Type the value present in the password variable inside password field
			cy.get("#passwordField").type(password);

			// Click the login button
			cy.contains("login").click();
			
			// Check if the login attempt was successful
			cy.contains(`${name} logged in`);	
		});

		it("fails with wrong credentials", function() {
			cy.get("#usernameField").type(username);
			cy.get("#passwordField").type("wrongPassword");
			cy.contains("login").click();
			
			// Check if the warning message displayed the text in "red" color 
			cy.contains("Invalid username or password").should("have.css", "color", "rgb(255, 0, 0)");

			// Since password was incorrect, login attempt should fail
			cy.should("not.contain", `${name} logged in`);
		});
	});

	describe("When logged in", function() {
		const title = "Initial test blog", author = "John Smith", url = "https://www.google.com/";

		beforeEach(function() {
			cy.loginAndSaveDetailsToLS(username, password, baseUrl, userKeyLS);

			cy.visit(baseUrl);

			cy.createBlogAndRefresh(title, author, url, baseUrl);
		});

		it("A blog can be created", function() {
			const title = "Test blog", author = "John Smith", url = "https://www.google.com/";

			// Check the html content doesn't contain the title of the blog 
			// which is added using the next createBlogAndRefresh command later below
			cy.get("html").should("not.contain", title);
			cy.createBlogAndRefresh(title, author, url, baseUrl);

			// The blog will be displayed now, so the title should be visible
			cy.contains(title);
		});

		it("A user can increase the \"likes\" count of any listed blog", function()
		{
			// Clicking on the "view" button expands the blog which contains a like button and more details of the blog
			cy.contains("view").click();

			// Initially, the like count should be 0 (the default value)
			cy.get("span").contains("likes 0");
			
			// Click the like button
			cy.contains(/^like$/).click();

			// After clciking the like button, the like count should be increased by 1
			cy.get("span").contains("likes 1");
		});

		it("The creator of the blog can delete the blog", function() {
			// A blog is created by the only user of the application who is currently logged in

			cy.contains(title);

			cy.contains("view").click();

			cy.contains("remove").click();

			// After clicking the remove button, the blog entry should be deleted
			// and a message should be displayed to indicate the blog was successfully deleted
			cy.contains(`Blog: ${title} by ${JSON.parse(localStorage.getItem(userKeyLS)).name} deleted successfully`)

			// The message disappears after roughly 5 seconds
			// After the disappearance of the message, blog title should not be present iin the html content
			cy.get("html", {timeout : 6000}).should("not.contain", title);			
		});

		it("A user that didn't create the blog entry can't delete it", function() {
			cy.contains("log out").click();

			// Add a new user to the "users" collection
			const username = "NewUser345", password = "test345", name = "Test";
			cy.request("POST", "http://localhost:3033/api/users", {username, password, name});

			// Login using the details of the new user
			cy.loginAndSaveDetailsToLS(username, password, baseUrl, userKeyLS);

			cy.visit(baseUrl);

			// Click on the view button of the 1st blog displayed
			// This blog is not created by the new user
			cy.contains("view").click();

			// Since the new user didn't create the listed blog, the remove button should not be visible
			cy.get(".removeButton").should("not.contain", "remove");
		});

		it("The listed blogs are sorted in descending order based on the \"likes\" count", function() {
			const secondBlogTitle = "Test blog 2", secondBlogAuthor = "Test author 2", secondBlogUrl = "https://www.google.com/";

			// Create a new blog entry
			cy.createBlogAndRefresh(secondBlogTitle, secondBlogAuthor, secondBlogUrl, baseUrl);

			cy.get(".blog").eq(0).contains(title);
			cy.get(".blog").eq(1).contains(secondBlogTitle);

			cy.get(".blog").eq(1).contains("view").click();
			cy.get(".blog").eq(1).contains(/^like$/).click();

			cy.visit(baseUrl);

			// The 1st blog listed will be the one with the most likes			
			cy.get(".blog").eq(0).contains(secondBlogTitle);
			cy.get(".blog").eq(1).contains(title);			
		});
	});
});