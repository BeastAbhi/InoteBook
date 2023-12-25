const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECREAT = "Iamago$dprogrammer";

//Rout-1: Create a User using: Post "/api/auth/createuser". NO login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // If ther are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success= false;
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //Check wheather the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success =false
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
     
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECREAT);
      success = true
      res.json({success, authtoken });
    } catch (error) {
      success = false
      console.error(error.message);
      res.status(500).send(success, "Internal Server Error");
    }
  }
);

//Rout-2: Authenticate a User using: Post "/api/auth/login". NO login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If ther are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({success, error: "Please try to login with correct Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECREAT);
      success = true
      res.json({ success, authtoken });
    } catch (error) {
      success = false
      console.error(error.message);
      res.status(500).send(success, "Internal Server Error");
    }
  }
);

//Rout-3: Get loggedin User details: Post "/api/auth/getuser". login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
