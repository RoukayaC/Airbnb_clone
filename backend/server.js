const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users = require("./routes/api/users");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongo_url = config.get("mongo_url");
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongo_url);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to connect to the database
connectDB();

// Use the users routes for authentication
app.use("/api/user", users);

// Set the port and host
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// Start the server
app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
