const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];

  if (!token) return res.send("token is not access");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_URL);
    const user = await User.findById(decoded.id);
    if (!user) return res.send("user is not found");

    console.log(decoded);
    req.user = user;
    next();
  } catch (error) {
    res.send("token is not verify");
  }
};
