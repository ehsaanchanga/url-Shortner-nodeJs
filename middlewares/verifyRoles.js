const verifyRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.roles)
      return res.status(401).json({ message: "Please send role" });

    const result = req.roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);

    if (!result)
      return res
        .status(401)
        .json({ message: "This role is not allowed to create URLS" });
    next();
  };
};

module.exports = verifyRoles;
