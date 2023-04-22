// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({

// email: {
//     type: String,
//     required: [true, "Please provide an Email!"],
//     unique: [true, "Email Exist"],
//   },

//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     unique: false,
//   },
//   })

//   module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	playlist: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'song',
			unique: true
		}],
		default: []
	}
});



user = mongoose.model('user', userSchema);

module.exports = user;