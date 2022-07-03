const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

router.get("/", async (req, res, next) => {
	try
	{
		const result = await Blog.find({}).populate("user", {username : 1, name : 1, id : 1});
		res.json(result);
	}
	catch (err)
	{
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try
	{
		const result = await Blog.findById(req.params.id).populate("user", {username : 1, name : 1, id : 1});
		res.json(result);
	}
	catch(err)
	{
		next(err);
	}
});

router.post("/", middleware.userExtractor, async (req, res, next) => {
	try
	{
		if (!("title" in req.body) || !("url" in req.body))
			return res.status(400).json({error : "title or url missing"});

		if (!("likes" in req.body))
			req.body.likes = 0;

		const selectedUser = await User.findById(req.user._id);
		const newBlog = {...req.body, user : selectedUser.id};

		const blog = new Blog(newBlog);

		const result = await blog.save();

		selectedUser.blogs = selectedUser.blogs.concat(result._id);
		await selectedUser.save();

		const finalResult = await Blog.findById(result._id).populate("user", {username : 1, name : 1, id : 1});

		res.status(201).json(finalResult);
	}
	catch (err)
	{
		next(err);
	}
});

router.delete("/:id", middleware.userExtractor, async (req, res, next) => {
	try 
	{
		const blog = await Blog.findById(req.params.id);
		
		if (blog && blog.user.toString() === req.user._id.toString())
		{
			await Blog.findByIdAndRemove(req.params.id);
			return res.status(204).end();
		}
		else if (!blog)
			return res.status(204).end();

		res.status(401).json({error : "The user is not the creator of the blog entry"});
	}
	catch(err)
	{
		next(err);
	}
});

//Could have used a patch request and only updated likes?
router.put("/:id", async (req, res, next) => {
	try 
	{
		// console.log(req.body);
		const { title, author, url, likes } = req.body;

		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {title, author, url, likes} , {new : true}).populate("user", {username : 1, name : 1, id : 1});
		
		if (updatedBlog)
			return res.json(updatedBlog);

		res.status(404).end();
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;