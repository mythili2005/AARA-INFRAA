const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Fetch all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (optional admin endpoint)
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

module.exports = router;
