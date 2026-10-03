const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const saltRounds = 10;
  try {
    //validate data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    //encrypt password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User data saved.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const isValidPassword = user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials.");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login success.");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = authRouter;
