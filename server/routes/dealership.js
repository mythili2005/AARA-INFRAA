const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const DealershipRequest = require("../models/Dealership");
require("dotenv").config();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Email transporter config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/dealership/submit
router.post("/submit", upload.single("businessLicense"), async (req, res) => {
  const {
    name,
    email,
    phone,
    companyName,
    address,
    location,
  } = req.body;

  try {
    const filePath = req.file ? req.file.path : "";

    const newRequest = new DealershipRequest({
      name,
      email,
      phone,
      companyName,
      address,
      location,
      businessLicense: filePath,
    });

    await newRequest.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Dealership Request",
      html: `
        <h2>Dealership Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Location:</strong> ${location}</p>
      `,
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              path: req.file.path,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request submitted successfully!" });
  } catch (error) {
    console.error("Error in /submit:", error);
    res.status(500).json({ error: "Request failed!" });
  }
});

module.exports = router;
