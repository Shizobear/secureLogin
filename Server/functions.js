const crypto = require("crypto");

const genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length/2))
  .toString("hex")
  .slice(0,length);
};

const sha512 = function(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};

module.exports = {


  saltHashPassword: function(userPassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
  },

  checkHashPassword: function(userPassword, salt) {
    var passwordData = sha512(userPassword, salt);
    return passwordData;
  }
};
