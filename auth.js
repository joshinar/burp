require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ errors: "Authorization denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.jwtsecret);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: "Authorization denied" });
  }
};
