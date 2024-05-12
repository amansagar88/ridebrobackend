const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("../db/conn");
const User = require("../model/userschema");
const Ride = require("../model/rideschema");

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
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "please enter both username and password" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        // sameSite: "strict",
      });

      if (!isMatch) {
        res.status(400).json({ error: "Email or password incorrect." });
      } else {
        res.status(200).json({ token });
      }
    } else {
      res.status(400).json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/createride", async (req, res) => {
  try {
    const { lstart, lend, cost, Npassenger, dateandtime, number, name } =
      req.body;

    if (
      !lstart ||
      !lend ||
      !cost ||
      !Npassenger ||
      !dateandtime ||
      !number ||
      !name
    ) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const ride = new Ride({
      lstart,
      lend,
      cost,
      Npassenger,
      dateandtime,
      number,
      name,
    });

    await ride.save();

    res.status(201).json({ message: "Ride has been created." });
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", (req, res) => {
  const jwtFormRequest = req.body.token;
  try {
    const decodeJwt = jwt.verify(jwtFormRequest, process.env.SECRET_KEY);
    res.json({ isValid: true });
  } catch (err) {
    res.json({ isValid: false });
  }
});

router.post("/user", async (req, res) => {
  try {
    const token = req.body.token;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found.");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    res.send(req.rootUser);
  } catch (err) {
    res.status(401).send("Unauthorized");
    console.log(err);
  }
});

router.get("/getrides", async (req, res) => {
  try{
    const rides=await Ride.find({});
    res.status(200).send(rides);
  }catch(err){
    console.log(err);
  }
});
module.exports = router;
