const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      imageUrl
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
