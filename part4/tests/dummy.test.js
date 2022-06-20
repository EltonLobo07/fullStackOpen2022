const obj = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = obj.dummy(blogs);
	expect(result).toBe(1);
});