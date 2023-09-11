const express = require("express");
const Roles = require("../../config/roles");
const {
  generateNewShortUrl,
  redirectUrl,
  showAnalytics,
} = require("../../controllers/url");
const {
  verifyAuthentication,
} = require("../../middlewares/verifyAuthentication");
const verifyRoles = require("../../middlewares/verifyRoles");

const router = express.Router();

router.post(
  "/",
  verifyAuthentication,
  verifyRoles([Roles.Admin]),
  generateNewShortUrl
);
router.get("/:id", redirectUrl);
router.get("/analytics/:shortId", showAnalytics);

module.exports = router;
