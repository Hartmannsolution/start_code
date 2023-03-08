const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: 60 * 30, // 30 minutes
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.get('/refresh', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    const newToken = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: 60 * 30, // 30 minutes
    });
    res.status(200).json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
});


module.exports = router;
