const jwt = require("jsonwebtoken");

const verifyAuthentication = (req, res, next) => {
  // const token = req.cookies.accessToken;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader?.split(" ")[1];
  if (!token) return res.redirect("/login");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token

    req.user = decoded.userInfo;
    next();
  });
};

const checkAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) res.redirect("/login");
  next();
};

module.exports = { verifyAuthentication, checkAuth };