const shortId = require("shortid");
const URL = require("../models/Url");

const generateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) return res.status(400).json({ message: "Url is required" });

  const id = shortId.generate();
  await URL.create({
    shortId: id,
    redirectUrl: body.url,
    visitHistory: [],
  });
  res.redirect("/url");
  return res.render("home", { id });
};

const redirectUrl = async (req, res) => {
  const shortId = req.params.id;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
};

const showAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  console.log(shortId, "shortId");

  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ message: "URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

const test = async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  return res.render("home", {
    urls: allUrls,
  });
};

module.exports = {
  generateNewShortUrl,
  redirectUrl,
  showAnalytics,
  test,
};
