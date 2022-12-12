// admin routers

const express = require("express");
const {
  adminLogin,
  adminVerified,
  userDetails,
  deleteUser,
  editUser,
} = require("../controllers/adminController");
const verifyJWT = require("../controllers/middleware");
// const verifyJWT = require("../controllers/middleware");
const router = express.Router();

// checking admin token route
router.get("/api/isAdminAuth", verifyJWT, adminVerified);

// admin login route
router.post("/api/login", adminLogin);

// userDetails get route
router.get("/api/user_details/" ,userDetails);

// userDetails update route
router.patch('/api/edit_user', editUser)

// userDetails delete route
router.delete("/api/delete_user", deleteUser);
module.exports = router;
