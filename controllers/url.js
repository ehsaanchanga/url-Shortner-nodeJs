const shortId = require("shortid");
const URL = require("../models/Url");

const generateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) return res.status(400).json({ message: "Url is required" });

  const id = shortId.generate();

  console.log(req?.user?._id);
  await URL.create({
    shortId: id,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req?.user?._id,
  });
  res.redirect("/");
  return res.render("home", { id });
};

const redirectUrl = async (req, res) => {
  const shortId = req.params.id;

  console.log(shortId);
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

  res.redirect(entry?.redirectUrl);
};

const showAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ message: "URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  generateNewShortUrl,
  redirectUrl,
  showAnalytics,
};
