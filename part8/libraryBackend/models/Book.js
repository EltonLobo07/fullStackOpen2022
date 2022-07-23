const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minLength: 2
	},
	published: {
		type: Number
	},
	author: {
		type: mongoose.ObjectId,
		ref: "Author" // Model name here
	},
	genres: {
		type: [String]
	}
});

module.exports = mongoose.model("Book", bookSchema);