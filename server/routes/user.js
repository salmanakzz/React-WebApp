// user routers

const express = require("express");
const verifyJWT = require("../controllers/middleware");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userVerified,
} = require("../controllers/userController");

// checking user token route
router.get("/api/isUserAuth", verifyJWT, userVerified);

// user registration route
router.post("/api/register", userRegister);

// user login route
router.post("/api/login", userLogin);
module.exports = router;
