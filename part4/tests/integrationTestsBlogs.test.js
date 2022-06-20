const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const mongoose = require("mongoose");

const api = supertest(app);

test("blogs are returned as json", async () => {
	const res = await api
				  	.get("/api/blogs")
					.expect(200)
					.expect("Content-type", /application\/json/);

	expect(res.body.length).toBe(helper.initialBlogs.length);
}, 100000);

test("blogs have 'id' property", async () => {
	const res = await api.get("/api/blogs");

	expect(res.body[0].id).toBeDefined();
}, 100000);

test("new blog was successfully added to the database", async () => {
	//Create a new blog
	const newBlogTitle = "Test blog";

	const newBlog = {
		title : newBlogTitle,
		author : "Elton Lobo",
		url : "https://www.google.com/",
		likes : 7
	};

	//post request to "/api/blogs"
	await api
		.post("/api/blogs")
		.set("authorization", authStr)
		.send(newBlog)
		.expect(201);

	//Perform a get request
	const res = await api.get("/api/blogs");

	//Check if length increased by 1
	expect(res.body.length).toBe(helper.initialBlogs.length + 1);

	//Check if object got added to the database correctly
	let addedBlog;

	for (obj of res.body)
	{
		if (obj.title === newBlogTitle)
			{
				addedBlog = obj;
				break;
			} 
	}

	expect(addedBlog).toBeDefined();
	expect(typeof addedBlog.title).toBe("string");
	expect(typeof addedBlog.author).toBe("string");
	expect(typeof addedBlog.url).toBe("string");
	expect(typeof addedBlog.likes).toBe("number");
}, 100000);

test("likes property if not passed, defaults to 0", async () => {
	//Create a new blog without the 'likes' property
	const newBlogTitle = "Test blog";

	const newBlog = {
		title : newBlogTitle,
		author : "Elton Lobo",
		url : "https://www.google.com/",
	};

	//Perform post request to "/api/blogs"
	await api
		.post("/api/blogs")
		.set("authorization", authStr)
		.send(newBlog);

	//Perform a get request
	const res = await api.get("/api/blogs");

	//Get the recently added blog
	let addedBlog;

	for (obj of res.body)
	{
		if (obj.title === newBlogTitle)
			{
				addedBlog = obj;
				break;
			} 
	}

	expect(addedBlog).toBeDefined();
	expect(addedBlog.likes).toBeDefined();
	expect(addedBlog.likes).toBe(0);
}, 100000);

test("server responds with 400 status code when title or url field is missing in the request body", async () => {
	//title missing
	let newBlog = {
		author : "Elton Lobo",
		url : "https://www.google.com/",
		likes : 1
	};	

	await api
		.post("/api/blogs")
		.set("authorization", authStr)
		.expect(400);

	//url missing
	newBlog = {
		title : "Test blog",
		author : "Elton Lobo",
		likes : 1
	};

	await api
		.post("/api/blogs")
		.set("authorization", authStr)
		.expect(400);
}, 100000);

test("adding a blog returns 401 status code if token not provided", async () => {
	const newBlog = {
		title : "Final exercise",
		author : "Elton Lobo",
		url : "https://www.google.com/",
		likes : 7
	};

	await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(401);
}, 100000);

describe("Deletion of a blog", () => {
	test("when the blog with the specified blog id is present in the database, it deletes the blog", async () => {
		let res = await api.get("/api/blogs");

		const blogId = res.body[0].id;

		await api
			.delete(`/api/blogs/${blogId}`)
			.set("authorization", authStr)
			.expect(204);

		res = await api.get("/api/blogs");

		expect(res.body.length).toBe(helper.initialBlogs.length - 1);

		const ids = res.body.map(blog => blog.id);
		expect(ids).not.toContain(blogId);
	}, 100000);

	test("when the blog with the specified blog id is not present in the database it doesn't modify the database", async () => {
		const fakeBlogId = "47a4abd1ae9d545783f2d586";

		await api
			.delete(`/api/blogs/${fakeBlogId}`)
			.set("authorization", authStr)
			.expect(204);

		const res = await api.get("/api/blogs");

		expect(res.body.length).toBe(helper.initialBlogs.length);
	}, 100000);
});

describe("updating a blog", () => {
	test("when the blog with the specified blog id is present in the database, it updates the blog", async () => {
		let res = await api.get("/api/blogs");
		const blog = res.body[0];

		res = await api
					.put(`/api/blogs/${blog.id}`)
					.send({likes : blog.likes + 7})
					.expect(200);

		expect(res.body.likes).toBe(blog.likes + 7);

		//Do we need to check the blog in the database if its updated? Don't think so 
		//because the res.body is returned only after successful update of the blog
	}, 100000);

	test("when the blog with the specified blog id is not present in the database, returns 404 status code", async () => {
		const fakeBlogId = "47a4abd1ae9d545783f2d586";

		await api
			.put(`/api/blogs/${fakeBlogId}`)
			.send({likes : 7})
			.expect(404);
	}, 100000);
});

let authStr = "Bearer ";

beforeAll(async() => {
	await User.deleteMany({});

	const username = "Mystic", password = "test123";

	const res = await api
					.post("/api/users")
					.send({username, password, name : "Elton Lobo"});

	const obj  = await api
	          		  .post("/api/login")
	                  .send({username, password});

	authStr += obj.body.token;

	//console.log(res.body);

	for (const blog of helper.initialBlogs)
		blog.user = res.body.id;
});

beforeEach(async () => {
	//Remove all of the blogs from the database
	await Blog.deleteMany({});

	//console.log(helper.initialBlogs[0]);

	//Create blog objects 
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));

	//Create a promise array using blog objects
	const promiseArr = blogObjects.map(blogObject => blogObject.save());

	//Wait for all the promises to be fulfilled
	await Promise.all(promiseArr);
}, 100000);

afterAll(() => mongoose.connection.close());