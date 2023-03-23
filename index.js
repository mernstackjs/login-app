require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const port = process.env.PORT;
const app = express();
const cors = require("cors");
const userController = require("./controller/user");
const { connectDB } = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userController);
app.get("/", (req, res) => {
  res.send("API is running on port");
});
app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
