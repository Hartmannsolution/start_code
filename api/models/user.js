const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true,
    lowercase: true,
    unique: true,
    minLength: 6,
    validate: { // custom validator (works only with create and save. Does NOT work with mongooses updateOne, updateMany, etc. So better to just get user with findById().save() or findOne().save())
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: ()=>Date.now(),
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  hobbies: [String],
  phone: {
    description: String,
    no: {
      type: String
    }
  }
});

// hash user password before saving into database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { // if password is not modified, then do not hash it again
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

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
const User = mongoose.model('User', UserSchema);

module.exports = {User, Address};
