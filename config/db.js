const mongoose = require("mongoose");

exports.connectDB = (req, res) => {
  mongoose
    .connect(process.env.CONNECT_URL)
    .then((res) => console.log("db is connected"))
    .catch((err) => console.log(err));
};
