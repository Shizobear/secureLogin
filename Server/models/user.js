var mongoose = require("mongoose");
var userSchema = mongoose.Schema;

userSchema = new userSchema({

    name: String,
    email : String,
    password: String,
    salt: String

});

var user = mongoose.model('user', userSchema);

module.exports = user;