
const express = require('express');
const router = express.Router();
const { Address, User } = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id/users', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).populate('users');
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const addressData = req.body;
    console.log("Address: ",addressData);
    const newAddress = new Address(addressData);
    await newAddress.save();
    res.status(200).json({ success: true, msg: 'Address saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;