const express = require("express");
const { verifyAuthentication } = require("../middlewares/verifyAuthentication");
const router = express.Router();

const URL = require("../models/Url");

router.get("/", verifyAuthentication, async (req, res) => {
  const allUrls = await URL.find({ createdBy: req?.user?._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
