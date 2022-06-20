const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username : {
		type : String,
		minLength : 3
	},
	password : String,
	name : String,
	blogs : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Blog"
		}
	]
});

userSchema.set("toJSON", {
	transform : function(document, returnedObj)
	{
		returnedObj.id = returnedObj._id.toString();

		delete returnedObj.password;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

module.exports = mongoose.model("User", userSchema);