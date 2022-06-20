require("dotenv").config();

module.exports = {
	PORT: process.env.PORT,
	MONGODB_URI: process.env.MONGODB_URI,
	TEST_MONGODB_URI: process.env.TEST_MONGODB_URI,
	NODE_ENV: process.env.NODE_ENV,
	SECRET: process.env.SECRET
};