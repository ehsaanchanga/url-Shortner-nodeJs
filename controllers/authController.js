const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "username and password are required to fill" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.sendStatus(401); // unauthorized
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        userInfo: foundUser,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    // res.cookie("accessToken", accessToken);

    res.json(accessToken);

    res.redirect("/");
  } else {
    res.status(401).json({ message: "Username or password invalid" }); // unauthorized
  }
};

module.exports = { authenticateUser };
