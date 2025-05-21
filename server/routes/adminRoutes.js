const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// Single image upload endpoint
router.post("/upload", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  
  res.json({
    success: true,
    imageUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;