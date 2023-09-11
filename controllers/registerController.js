const User = require("../models/User");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400).json({ message: "All the required fields are mandatory." });
  }

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate)
    return res
      .status(409)
      .json({ message: "Already user present with username " + username }); // conflict

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and store user in mongodb
    await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    // res
    //   .status(201)
    //   .json({ message: `New user ${username} created successfully` });

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
};

module.exports = { registerUser };
