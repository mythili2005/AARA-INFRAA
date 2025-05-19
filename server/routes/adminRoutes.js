const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/products/upload-image", upload.single("productImage"),  (req, res) => {
  if (!req.file) {
    console.log("⚠️ No file uploaded.");
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("✅ File uploaded:", req.file.filename);
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


module.exports = router;
