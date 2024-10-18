const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users = require("./routes/api/users");
const app = express();

// Middleware
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "https://frontend-kappa-ten-65.vercel.app",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB
const mongo_url = config.get("mongo_url");
mongoose.set("strictQuery", true);
mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Use the users routes for authentication
app.use("/api/user", users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
