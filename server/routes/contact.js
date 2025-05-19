const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Existing POST for new contact form submission
router.post('/', async (req, res) => {
  const { fullname, email, mobile, message } = req.body;
  try {
    const newContact = new Contact({ fullname, email, mobile, message });
    await newContact.save();

    // Send notification email to admin (optional)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'New Contact Form Submission',
      html: `<h2>New Contact Message</h2>
             <p><strong>Name:</strong> ${fullname}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mobile:</strong> ${mobile}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).json({ message: 'Message received!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// New GET: Retrieve all contacts (admin dashboard)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

// New POST: Admin reply to contact message
router.post('/reply/:id', async (req, res) => {
  const contactId = req.params.id;
  const { replyMessage } = req.body;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    // Save reply and mark as replied
    contact.reply = replyMessage;
    contact.replied = true;
    await contact.save();

    // Send reply email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: 'Response to Your Query',
      html: `<p>Hi ${contact.fullname},</p>
             <p>Thank you for contacting us. Here is our response:</p>
             <blockquote>${replyMessage}</blockquote>
             <p>Best regards,<br/>AARA INFRAA Team</p>`,
    });

    res.status(200).json({ message: 'Reply sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

module.exports = router;
