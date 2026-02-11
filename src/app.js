const express = require("express");
const cors = require("cors");

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// app init
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes usage
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;


app.get ("/", (req,res) => {
    res.send("API is running");
});