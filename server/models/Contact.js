const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  mobile: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
