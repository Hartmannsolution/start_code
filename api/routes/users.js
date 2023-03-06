const express = require('express');
const router = express.Router();
const {User,Address} = require('../models/user');

router.get('/user', (req, res) => {
    console.log("GETTING USERS: ",User);
  User.find((err, users) => {
    if (err) return res.status(500).json({err: err});
    return res.json(users);
  });
});

router.get('/address', (req, res) => {
Address.find((err, addresses) => {
  if (err) return res.status(500).json({err: err});
  return res.json(addresses);
});
});

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' }); // 404 Not Found
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/userswithaddress', async (req, res) => {
    console.log("GETTING USERS: ",User);
    const persons = await User.find().populate('address');
    return res.json(persons);

  // User.find((err, users) => {
  //   if (err) return res.status(500).json({err: err});
  //   users.populate('address');
  //   return res.json(users);
  // });
});


router.get('/address/:id/users', async (req, res) => {
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



router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await User.findByIdAndDelete(userId);
    res.json({msg: 'User deleted successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({msg:'Server error'});
  }
});

router.post('/user', async (req, res) => {
  try {
    const userData = req.body;
    console.log("USER: ",userData);
    const newUser = new User(userData);
    await newUser.save();
    res.status(200).json({ success: true, msg: 'User saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.post('/address', async (req, res) => {
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

router.post('/addressuser', async (req, res) => {
  try {
    // Retrieve the address for the person
    const address = await Address.findById(req.body.addressId);
    console.log("ADDRESS: ",address);
    if (!address) {
      return res.status(400).json({ message: 'Invalid address ID' });
    }

    // Create the new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: address._id,
    });

    // Save the new person
    await user.save();

    // Add the person to the address's persons array
    address.users.push(user._id);
    await address.save();

    // Return the new person document as the response
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// router.put('/user/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { name, email, password } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({msg:'User not found'});
//     }
//     user.name = name;
//     user.email = email;
//     user.password = password;

//     await user.save();
//     res.send(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({msg:'Server error'});
//   }
// });
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const updateDTO = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("USER: ",user);

    // Update user object with fields from DTO
    Object.assign(user, updateDTO);

    // Save updated user object to database
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: `Failed to update user: ${err}` });
  }
});

module.exports = router;