const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
	try 
	{
		if (!("username" in req.body) || !("password" in req.body))
			return res.status(400).json({error : "Missing username or password"});

		if (req.body.password.length < 3)
			return res.status(400).json({error : "Password must be atleast 3 characters long"});

		const users = await User.find({});
		const usernames = users.map(user => user.username.toLowerCase());

		const { name, username, password } = req.body;

		if (usernames.includes(username.toLowerCase()))
			return res.status(400).json({error : "Username must be unique"});

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const newUser = new User({
			name, 
			username, 
			password : passwordHash
		});

		const userObj = await newUser.save();
		res.json(userObj);
	}
	catch (err)
	{
		next(err);
	}
});

router.get("/", async (req, res, next) => {
	try
	{
		const users = await User.find({}).populate("blogs", {author : 1, url : 1, title : 1});
		res.json(users);
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;