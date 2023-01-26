const bcrypt = require("bcrypt");

function comparePasswords(enteredPassword, dbPassword) {
  const result = bcrypt.compareSync(enteredPassword, dbPassword);
  return result;
}

function generateSalt() {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return salt;
}

function generateHash(enteredPassword, saltValue) {
  const hash = bcrypt.hashSync(enteredPassword, saltValue);
  return hash;
}

module.exports = { comparePasswords, generateSalt, generateHash };
