const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  titel: String,
  desc: String,
  cate: String,
  image: String,
  price: String,
});

module.exports = mongoose.model("Products", productsSchema);
