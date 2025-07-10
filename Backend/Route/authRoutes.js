const express = require("express");
const { loginManager } = require("../Controller/AuthController");

const router = express.Router();

router.post("/login", loginManager);

module.exports = router;
