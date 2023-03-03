// Run this script with: `docker exec node-api node test_data/populate_users.js`
const mongoose = require('mongoose');
const User = require('../models/user');

const testUsers = [
  {
    name: 'Jack Smith',
    email: 'jack@example.com',
    password: '123456'
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '654321'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'abcdef'
  }
];

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

User.insertMany(testUsers, (err) => {
  if (err) return console.error(err);
  console.log('Test data inserted successfully');
});