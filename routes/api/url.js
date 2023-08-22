const express = require("express");
const {
  generateNewShortUrl,
  redirectUrl,
  showAnalytics,
} = require("../../controllers/url");

const router = express.Router();

router.post("/", generateNewShortUrl);
router.get("/:id", redirectUrl);
router.get("/analytics/:shortId", showAnalytics);

module.exports = router;
