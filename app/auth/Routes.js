const express = require("express");
const router = express.Router();
const User = require("../users/model");
const Profile = require("../profiles/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../auth/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const twilio = require("../utils/twilio");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date());
  next();
});

router.post("/signup", async function (req, res) {
  try {
    const { email, password } = req.body;

    const newProfile = await Profile.create({});

    if (!newProfile) throw new Error("Error to create profile");

    const encriptePassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      password: encriptePassword,
      profile: newProfile._id,
    });

    if (!newUser) throw new Error("Error to create user");

    const token = jwt.sign({ userId: newUser.id }, APP_SECRET);
    res.status(200).json(token);
  } catch (error) {
    ErrorHandler.restError({
      error: error,
      message: "Something was wrong",
      functionName: "signup",
      fileName: "Routes.js",
      moduleName: "auth",
      res: res,
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    }).populate("profile");
    if (!user) {
      throw new Error("User found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    res.status(200).json(token);

    if (user.profile.countryCode && user.profile.phoneNumber) {
      const userName = user.profile.firstName ? user.profile.firstName : "";
      const sms = await twilio.sendSMS({
        toPhoneNumber: user.profile.phoneNumber,
        countryCode: user.profile.countryCode,
        body: `Hola ${userName} has iniciado sesión, si no fuiste tú contacta con servicio al cliente`,
      });
    }
  } catch (error) {
    ErrorHandler.restError({
      error: error,
      message: "The email or password was wrong",
      functionName: "login",
      fileName: "Routes.js",
      moduleName: "auth",
      res: res,
    });
  }
});
// define the about route
router.post("/resetPassword", function (req, res) {
  res.send("nueva contraseña");
});

module.exports = router;
