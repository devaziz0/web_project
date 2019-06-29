var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/db");

var userSchema = mongoose.Schema({  
        first_name: String,
        last_name: String, 
		login: String,
		password: String
});
var User = mongoose.model("User", userSchema);

module.exports = User;