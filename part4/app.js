const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

//Connect to the database
logger.info("Connecting to the database");

mongoose
	.connect(config.NODE_ENV != "test" ? config.MONGODB_URI : config.TEST_MONGODB_URI)
	.then(() => logger.info("Connected to the database"))
	.catch(err => logger.error(err));


//Create express application
const app = express();


//Use all of the necessary middlewares
app.use(cors({origin : "*"})) //Same as app.use(cors()) ?
app.use(express.json());
app.use(middleware.getTokenFrom);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;