require("dotenv").config();
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

router.post(
  "/login",
  [
    check("email", "Enter your registered email")
      .not()
      .isEmpty(),
    check("password", "Please Enter your password")
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(402).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(402).json({ errors: "Invalid credentials" });
      }
      //   compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(402).json({ errors: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtsecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  }
);

module.exports = router;
