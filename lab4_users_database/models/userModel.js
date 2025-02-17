const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  address: {
    street: {
      type: String,
      required: true
    },
    suite: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]+$/, 'City should only contain alphabets and spaces']
    },
    zipcode: {
      type: String,
      required: true,
      match: [/^\d{5}-\d{4}$/, 'Zip code must be in the format DDDDD-DDDD']
    },
    geo: {
      lat: {
        type: String,
        required: true
      },
      lng: {
        type: String,
        required: true
      }
    }
  },
  phone: {
    type: String,
    required: true,
    match: [/^1-\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the format 1-XXX-XXX-XXXX']
  },
  website: {
    type: String,
    required: true,
    match: [/^https?:\/\/[^\s]+$/, 'Website must be a valid URL']
  },
  company: {
    name: {
      type: String,
      required: true
    },
    catchPhrase: {
      type: String,
      required: true
    },
    bs: {
      type: String,
      required: true
    }
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
