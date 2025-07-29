const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controller/AdminUserController");

router.post("/login", adminLogin);

module.exports = router;
