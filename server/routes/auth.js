const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const axios = require('axios');

const router = express.Router();

// Send OTP
const sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Login/Signup',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

// Password regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

// ✅ Signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });

    const otp = crypto.randomInt(100000, 999999);
    await sendOTPEmail(email, otp);

    user.otp = otp;
    user.otpExpires = moment().add(5, 'minutes').toDate();

    await user.save();

    res.status(201).json({
      message: 'Signup successful. OTP sent to your email.',
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const otp = crypto.randomInt(100000, 999999);
    await sendOTPEmail(email, otp);

    user.otp = otp;
    user.otpExpires = moment().add(5, 'minutes').toDate();
    await user.save();

    res.status(200).json({
      message: 'OTP sent to your email.',
      email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// ✅ OTP Verification
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (moment().isAfter(user.otpExpires)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // ✅ Now generate token after OTP is verified
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

// ✅ Google Login (no OTP required)
router.post('/google-login', async (req, res) => {
  try {
    const { tokenId } = req.body;
    const googleUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`;
    const response = await axios.get(googleUrl);

    const { email, name } = response.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ fullName: name, email, password: '' });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Google login successful',
      token,
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Google login failed' });
  }
});

module.exports = router;
