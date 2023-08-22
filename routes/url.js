const express = require("express");
const { test } = require("../controllers/url.js");

const router = express.Router();

router.get("/", test);

module.exports = router;
