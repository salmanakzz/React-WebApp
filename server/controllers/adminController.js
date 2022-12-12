// admin routes controlling

const adminHelper = require("../helpers/adminHelper");

// admin verified route
const adminVerified = (req, res) =>
  res.json({ status: "ok", admin: true, auth: true });

// admin login route controlling
const adminLogin = (req, res) => {
  console.log(req.body);
  adminHelper
    .doLogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// userDetails get route controlling
const userDetails = async (req, res) => {
  try {
    const response = await adminHelper.getUserDetails();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

// userDetails update route controlling
const editUser = (req, res) => {
  const { data } = req.body;
  adminHelper
    .editUserDetails(data)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// user delete route controlling
const deleteUser = (req, res) => {
  const { userId } = req.body;
  adminHelper
    .deleteUserDetails(userId)
    .then((response) => {
      res.json("true");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  adminVerified,
  adminLogin,
  userDetails,
  editUser,
  deleteUser,
};
