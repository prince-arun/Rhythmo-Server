const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// router.post("/register", async (req, res) => {
//   try {

//     const password = req.body.password;
//     const salt = await bcrypt.genSaltSync(10);
//     const hashedPassword = await bcrypt.hashSync(password, salt);
//     req.body.password = hashedPassword;
//     const user = new User(req.body);
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res
//         .status(200)
//         .send({ message: "User already exists", success: false });
//     } else {
//       await user.save();
//       return res
//         .status(200)
//         .send({ message: "User registered successfully", success: true });
//     }
//   } catch (error) {
//     return res.status(500).send({ message: error.message, success: false });
//   }
// });
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, country, gender, agreeToTerms } =
      req.body;

    // Validate the new fields as needed
    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !country ||
      !gender ||
      !agreeToTerms
    ) {
      return res.status(400).send({
        message: "Please fill in all required fields",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      country,
      gender,
      agreeToTerms,
    });

    await user.save();

    return res.status(201).send({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Registration failed. Please try again later.",
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const passwordsMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordsMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "User logged in successfully",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/get-user-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = undefined;
    return res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
