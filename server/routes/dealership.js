const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const DealershipRequest = require("../models/Dealership");
require("dotenv").config();

// Setup uploads directory
const uploadDir = path.join(__dirname, "..", "uploads");



// Ensure uploads folder exists
const fs = require("fs");
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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
    if (!allowedExt.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Only PDF, JPG, JPEG, PNG files allowed"));
    }
    cb(null, true);
  },
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function fixBusinessLicensePaths() {
  const requests = await DealershipRequest.find();
  for (const req of requests) {
    if (req.businessLicense && req.businessLicense.includes('\\')) {
      // Extract filename from full path
      const filename = req.businessLicense.split('\\').pop();
      req.businessLicense = filename;
      await req.save();
      console.log(`Updated: ${req._id}`);
    }
  }
  console.log('All done!');
}

fixBusinessLicensePaths()
  .then(() => process.exit())
  .catch(err => console.error(err));

// Submit dealership request with file upload
router.post("/submit", upload.single("businessLicense"), async (req, res) => {
  try {
    const { name, email, phone, companyName, address, location } = req.body;
    const filePath = req.file ? req.file.filename : "";


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

    // Send notification email with attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Dealership Request",
      html: `
        <h2>New Dealership Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Location:</strong> ${location}</p>
      `,
      attachments: req.file
        ? [{ filename: req.file.originalname, path: req.file.path }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request submitted successfully!" });
  } catch (error) {
    console.error("Error in /submit:", error);
    res.status(500).json({ error: "Request failed!" });
  }
});

// Get all dealership requests
router.get("/all", async (req, res) => {
  try {
    const requests = await DealershipRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Error fetching dealership requests" });
  }
});

// Admin sends reply email
router.post("/reply", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reply sent successfully" });
  } catch (err) {
    console.error("Reply error:", err);
    res.status(500).json({ error: "Failed to send reply" });
  }
});

module.exports = router;
