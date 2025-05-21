const mongoose = require('mongoose');

const dealershipRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  companyName: String,
  address: String,
  location: String,
  businessLicense: {
    type: String,
    validate: {
      validator: function (v) {
        return !v.includes('\\') && !v.includes('/');
      },
      message: 'Invalid path format for business license.'
    }
  },
  replied: {
    type: Boolean,
    default: false,
  },
  replyMessage: {
    type: String,
    default: "",
  },
  replyDate: {
    type: Date,
  },
}, { timestamps: true });

const DealershipRequest = mongoose.model('DealershipRequest', dealershipRequestSchema);

module.exports = DealershipRequest;
