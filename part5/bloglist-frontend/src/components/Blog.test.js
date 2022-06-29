import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("Blog component", () => {
	const blog = {
			title : "Test blog",
			author : "John Smith",
			url : "https://www.google.com/",
			likes : 0,
			user : {
				username : "Mystic07",
				id : "12345",
				name : "Elton Lobo"
			}
		};

	test("displays only the blog title and author by default", () => {
		const container = render(<Blog blog = {blog} />).container;

		// const stringToMatch = `${blog.title}.*${blog.author}`; 
		// screen.getByText(new RegExp(stringToMatch));

		const shortVersionDiv = container.querySelector(".shortVersion");
		const longVersionDiv = container.querySelector(".longVersion");

		expect(shortVersionDiv).not.toHaveStyle("display : none");
		expect(longVersionDiv).toHaveStyle("display : none");
	});

	test("displays the longer version of a blog when the button to show details is clicked", async () => {
		const container = render(<Blog blog = {blog} />).container;

		const user = userEvent.setup();
		const viewButton = container.querySelector(".viewButton");
		await user.click(viewButton);

		const longVersionDiv = container.querySelector(".longVersion");
		// screen.debug(longVersionDiv);
		expect(longVersionDiv).not.toHaveStyle("display : none");
	});

	test("Function associated to the like button gets called twice when like button pressed twice", async () => {
		const mockHandler = jest.fn();
		const container = render(<Blog blog = {blog} updateBlog = {mockHandler} />).container;

		const user = userEvent.setup();
		// const viewButton = container.querySelector(".viewButton");
		// await user.click(viewButton);

		// Even after not executing the above commented lines, this test passes
		// That means it does not depend on what is currently displayed on the screen 	

		const likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});