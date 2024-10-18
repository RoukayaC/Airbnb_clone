const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// Register route
router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  // Check if email already exists
  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Email already exists" });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password, role });

    // Generate salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", msg: "Internal server error" });
      }

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", msg: "Internal server error" });
        }

        // Replace plain password with hashed password
        newUser.password = hash;

        // Save the user to the database
        newUser
          .save()
          .then((user) => {
            // Generate JWT token
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: config.get("tokenExpire") },
              (err, token) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ status: "error", msg: "Internal server error" });
                }

                // Send response with token and user details
                res.status(200).json({
                  status: "ok",
                  msg: "Successfully registered",
                  token,
                  user,
                });
              }
            );
          })

          .catch((err) => {
            return res
              .status(500)
              .json({ status: "error", msg: "Internal server error" });
          });
      });
    });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  // Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "not ok", msg: "Invalid email or password" });
      }

      // Generate JWT token if credentials are valid
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpire") },
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", msg: "Internal server error" });
          }

          // Send response with token and user details
          res.status(200).json({
            status: "ok",
            msg: "Successfully logged in",
            token,
            user,
          });
        }
      );
    });
  });
});

module.exports = router;
