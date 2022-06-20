const {error} = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("./config");

const getTokenFrom = (req, res, next) => {
	const authorization = req.get("authorization");

	if (authorization && authorization.toLowerCase().startsWith("bearer "))
		req.token = authorization.substring(7);
	else
		req.token = null;

	next();
};

const userExtractor = async (req, res, next) => {
	try
	{
		const decodedToken = jwt.verify(req.token, config.SECRET);

		if (!decodedToken.id)
			return res.status(401).json({error : "Token missing or invalid"});

		req.user = await User.findById(decodedToken.id);

		next();
	}
	catch (err)
	{
		next(err);
	}
};

const unknownEndpointHandler = (req, res) => res.status(404).json({error : "unknown endpoint"});

const errorHandler = (err, req, res, next) => {
	error(err);

	if (err.name === "ValidationError")
		return res.status(400).json({err : err.message});

	if (err.name === "JsonWebTokenError")
		return res.status(401).json({error : "Invalid token"});

	return res.status(500).end();
};

module.exports = {getTokenFrom, userExtractor, unknownEndpointHandler, errorHandler};