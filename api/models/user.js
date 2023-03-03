const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
});

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  country: String,
  zip: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Address = mongoose.model('Address', AddressSchema);
const User = mongoose.model('User', userSchema);

module.exports = {User, Address};
