const Products = require("../model/products");
const productController = require("express").Router();

productController.post("/create-product", async (req, res) => {
  const { desc, cate, titel, image, price } = req.body;
  if (!desc || !cate || !titel || !image) return res.send("you have to fill");
  try {
    const products = await Products.create({ desc, cate, titel, image, price });
    res.json({ products });
  } catch (error) {
    res.send(error);
  }
});

productController.get("/get-product", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json({ products });
  } catch (error) {
    res.send(error);
  }
});

module.exports = productController;
