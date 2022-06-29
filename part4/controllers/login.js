const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
	try
	{
		if (!("username" in req.body) || !("password" in req.body))
		return res.status(400).json({error : "username or password missing"});

		const { username, password } = req.body;

		const user = await User.findOne({username});
		const correct = user === null ? false : await bcrypt.compare(password, user.password); 

		if (!correct)
			return res.status(401).json({error : "Invalid username or password"});

		if (user.length === 0)
			return res.status(400).json({error : "username not present in the database"});

		const requiredUserInfo = {username : user.username, id : user.id}; 
		const token = jwt.sign(requiredUserInfo, config.SECRET);

		res.json({token, username, name : user.name});
	}
	catch (err)
	{
		next(err);
	}
});

module.exports = router;