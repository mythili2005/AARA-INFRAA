const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const dealershipRoutes = require("./routes/dealership");
const productsRoutes = require("./routes/products");
const fs = require('fs');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/list-uploads', (req, res) => {
  const uploadFolder = path.join(__dirname, 'uploads');
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to list files' });
    res.json(files);
  });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Route files
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes); // Auth routes
app.use("/api/dealership", dealershipRoutes);
app.use("/api/products", productsRoutes);

let otpStore = {};  // Temporary store for OTPs (you can use a DB in production)


// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // Replace with your email
    pass: process.env.EMAIL_PASS,   // Replace with your email password
  },
});

// Function to send OTP via email
const sendOtp = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  // Save OTP to temporary store (you can use a database in production)
  otpStore[email] = otp;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email,                    // recipient address
    subject: 'Your OTP Code',     // subject line
    text: `Your OTP code is: ${otp}`, // plain text body (fix template literal)
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`); // Fix template literal
  } catch (error) {
    console.error(`Error sending OTP: ${error}`); // Fix template literal
  }
};

// Route for sending OTP
app.post('/api/otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Call sendOtp function
  await sendOtp(email);

  return res.status(200).json({ message: 'OTP sent successfully' });
});

// Route for verifying OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  // Check if OTP matches
  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP is verified, remove it from the store
    return res.status(200).json({ message: 'OTP verified successfully' });
  }

  return res.status(400).json({ message: 'Invalid OTP' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Fix template literal
.catch(err => console.log(`MongoDB error: ${err}`)); // Fix template literal

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Fix template literal
});
