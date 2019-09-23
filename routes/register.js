require("dotenv").config();
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Email is Required").isEmail(),
    check("name", "Please enter your name")
      .not()
      .isEmpty(),
    check("password", "Password cannot be blank")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(402).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(402)
          .json({ errors: "Email already exists.Try a new one" });
      } else {
        user = await new User(req.body);
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // generate jwt token
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
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  }
);
module.exports = router;
