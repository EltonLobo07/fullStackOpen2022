const { favoriteBlog } = require("../utils/list_helper");

describe("favorite blog", () => {
	test("when number of blogs in the list is zero", () => {
		const blogs = [];

		expect(favoriteBlog(blogs)).toEqual(null);
	});

	test("when there is just one blog in the list", () => {
		const blogs = [
			{
			    _id: "5a422a851b54a676234d17f7",
			    title: "React patterns",
			    author: "Michael Chan",
			    url: "https://reactpatterns.com/",
			    likes: 7,
			    __v: 0
			}
		];

		expect(favoriteBlog(blogs)).toEqual({
			title: blogs[0].title,
			author: blogs[0].author,
			likes: blogs[0].likes
		});
	});

	test("when there are more some number of blogs in the list", () => {
		const blogs = [
		  	{
			    _id: "5a422ba71b54a676234d17fb",
			    title: "TDD harms architecture",
			    author: "Robert C. Martin",
			    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
			    likes: 3,
			    __v: 0
		  	},
		  	{
			    _id: "5a422b891b54a676234d17fa",
			    title: "First class tests",
			    author: "Robert C. Martin",
			    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			    likes: 10,
			    __v: 0
		  	},
		  	{
			    _id: "5a422bc61b54a676234d17fc",
			    title: "Type wars",
			    author: "Robert C. Martin",
			    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			    likes: 2,
			    __v: 0
		  	}  
		];

		expect(favoriteBlog(blogs)).toEqual({
			title: blogs[1].title,
			author: blogs[1].author,
			likes: blogs[1].likes  
		});
	});	
});