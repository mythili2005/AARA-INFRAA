const mongoose = require('mongoose');

const dealershipRequestSchema = new mongoose.Schema({
  name: String,             // frontend "name"
  email: String,
  phone: String,            // frontend "phone"
  companyName: String,
  address: String,          // new field you have in frontend
  location: String,
  businessLicense: {
  type: String,
  validate: {
    validator: function (v) {
      return !v.includes('\\') && !v.includes('/');
    },
    message: 'Invalid path format for business license.'
  }
}},{ timestamps: true } // for storing uploaded file path
);

const DealershipRequest = mongoose.model('DealershipRequest', dealershipRequestSchema);

module.exports = DealershipRequest;
