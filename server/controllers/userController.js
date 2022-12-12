// user routes controlling

const userHelper = require("../helpers/userHelper");

// user verified route
const userVerified = (req, res) =>
  res.json({ status: "ok", user: true, auth: true });

// user registration route controlling
const userRegister = (req, res) => {
  userHelper
    .doRegister(req.body)
    .then(() => {
      res.json({ status: "ok" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "error", error: "Duplicate email" });
    });
};

// user login route controlling
const userLogin = (req, res) => {
  console.log(req.body);
  userHelper
    .doLogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

module.exports = {
  userVerified,
  userRegister,
  userLogin,
};
