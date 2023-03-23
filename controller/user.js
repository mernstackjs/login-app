const User = require("../model/user");
const userController = require("express").Router();
const jwt = require("jsonwebtoken");
const { verify } = require("../middleware/verify");
userController.get("/user", verify, async (req, res) => {
  const user = await User.find({});
  res.json({ user });
});

userController.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExit = await User.findOne({ email });
    if (isExit) return res.send("user is already is exit");
    if (password.length < 6) return res.send("password is less then 6");
    const user = await User.create({ username, email, password });
    res.json({ user });
  } catch (error) {
    res.json({ message: error });
  }
});
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select(" +password");
    if (!user) return res.send("user is not exit");
    const isMatched = await user.isMatchedPassword(password);
    if (!isMatched) return res.send("user is password is wrong");
    const token = jwt.sign({ id: user._id }, process.env.SECRET_URL, {
      expiresIn: "1hr",
    });
    res.json({ user, token });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = userController;
