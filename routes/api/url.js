const express = require("express");
const {
  generateNewShortUrl,
  redirectUrl,
  showAnalytics,
} = require("../../controllers/url");
const {
  verifyAuthentication,
} = require("../../middlewares/verifyAuthentication");

const router = express.Router();

router.post("/", verifyAuthentication, generateNewShortUrl);
router.get("/:id", redirectUrl);
router.get("/analytics/:shortId", showAnalytics);

module.exports = router;
