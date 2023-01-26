const UserModal = require("../modals/UserSchema");
const { generateHash, generateSalt } = require("../utils/encrypt");

function RegisterUser(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const salt = generateSalt();
  const hashedPassword = generateHash(password, salt);

  let userdata = {
    username: username,
    email: email,
    password:password,
    encyptedpassword: hashedPassword,
  };
  let result = new UserModal(userdata);
  result
    .save()
    .then((item) => {
      return res.json({
        message: "Registration Successful",
        data: item,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        message: "Registration Failed",
      });
    });
}

// we here export the function, if there are multiple functions, create a object {} and pass the functions which you need to pass on to the other file to use
module.exports = RegisterUser;
