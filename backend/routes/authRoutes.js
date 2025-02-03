const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // To issue a JWT token
// const userModel = require("../models/User"); // Adjust the path as per your project structure
const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password} = req.body;
  
    try {
      let user = await User.findOne({ email: email });
  
      if (user) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User already exists. Use diffrent mail Id",
          });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
  
      user = new User({
        name,
        email,
        password: hashpassword,
      });
  
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "User successfully created" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  })






// POST route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is empty
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If the password matches, generate a JWT token
    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Token expires in 1 hour

    // Send response with token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

module.exports = router;
