import { render, screen } from "@testing-library/react";
import AddBlogForm from "./AddBlogForm";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("addBlogFrorm component", () => {
	test("when filled the form and submitted calls the correct function with proper details", async () => {
		const someTitle = "someTitle", someAuthor = "someAuthor", someUrl = "https://www.someUrl.com";

		const mockHandler = jest.fn((e, obj) => { e.preventDefault() });
		const container = render(<AddBlogForm addBlog = {mockHandler} />).container;

		const titleField = container.querySelector("#title");
		const authorField = container.querySelector("#author");
		const urlField = container.querySelector("#url");
		const createButton = screen.getByText("create");

		const user = userEvent.setup();
		await user.type(titleField, someTitle);
		await user.type(authorField, someAuthor);
		await user.type(urlField, someUrl);

		await user.click(createButton);

		const returnedObj = mockHandler.mock.calls[0][1];
		expect(returnedObj.title).toBe(someTitle);
		expect(returnedObj.author).toBe(someAuthor);
		expect(returnedObj.url).toBe(someUrl);
	});
});