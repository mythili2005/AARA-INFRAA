const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  reply: { type: String, default: '' },           // admin reply message
  replied: { type: Boolean, default: false },     // reply status
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
