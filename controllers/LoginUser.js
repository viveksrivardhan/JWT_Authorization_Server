const UserModal = require("../modals/UserSchema");
const { comparePasswords } = require("../utils/encrypt");
//authen token
const jwt = require("jsonwebtoken");

function LoginUser(req, res, next) {
  const bcrypt = require("bcrypt");
  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    return res.json({ error: "email not found" });
  }
  UserModal.findOne({ email }, (err, data) => {
    if (err) {
      return res.json({
        message: "not a valid user email",
      });
    } else {
      const passwordmatch = comparePasswords(password, data.encyptedpassword);
      if (passwordmatch) {
        // jwt.sign({data},secretkey,{time and expiry})
        let accesstoken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN, {
          expiresIn: "20m",
        });
        return res.json({
          message: "logged in succesfully",
          login: true,
          token: accesstoken,
        });
      } else {
        return res.json({
          message: "not a valid password",
        });
      }
    }
  });
}
module.exports = LoginUser;
