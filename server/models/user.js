const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, 
    default: '',     
  },
  otp: {
    type: String,  
  },
  otpExpiry: {
    type: Date,    
  },
  otpAttempts: {
    type: Number,  
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
