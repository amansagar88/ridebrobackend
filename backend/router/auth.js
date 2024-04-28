const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const router = express.Router();

require("../db/conn");
const User = require("../model/userschema");

router.get("/", (req, res) => {
  res.send("HI");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, number, gender, password, cpassword } = req.body;

    if (!name || !email || !number || !gender || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const numberExist = await User.findOne({ number: number });
    const emailExist = await User.findOne({ email: email });

    if (numberExist || emailExist) {
      return res.status(800).json({ error: "User already Exit." });
    } else if (password != cpassword) {
      return res
        .status(401)
        .json({ error: "Password and Confirm Password does not match" });
    }

    const user = new User({ name, email, number, gender, password, cpassword });

    await user.save();

    res.status(201).json({ message: "User has been created." });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "please enter both username and password" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Email or password incorrect." });
      } else {
        res.json({ message: "Login Sucessfully." });
      }
    } else {
      res.status(400).json({ message: "Email or password incorrect." });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
