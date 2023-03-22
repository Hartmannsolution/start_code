const express = require('express');
const router = express.Router();
const { User, Address } = require('../models/user');

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Replace with your own secret key

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    req.user = decoded; // Add decoded user information to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.', error: err });
  }
};

// Middleware function to validate and refresh JWT token
const refreshToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // Check if the token is about to expire (within 60 seconds)
    const now = Date.now().valueOf() / 1000;
    //if (decoded.exp - now < 60) {
    const newToken = jwt.sign({ userId: user._id, name: user.name }, secret, {
      expiresIn: 60 * 30, // 30 minutes
    });
    res.setHeader('authorization', newToken);
    //}
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.', err: err });
  }
};

router.get('/', (req, res) => {
  console.log("GETTING USERS: ", User);
  User.find((err, users) => {
    if (err) return res.status(500).json({ err: err });
    return res.json(users);
  });
});

// register a new user and if student info
router.post('/register', async (req, res) => {
  const userData = req.body;

});

async function createUser(name, email, password) {
  try {
    // Check if the email is already taken
    let found = await User.findOne({ email });
    if (found) {
      // return res.status(400).json({ msg: 'Email already taken' });
      throw new Error('Email already taken');
    }
    const user = await User.create({ name, email, password });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createStudent(className, group, user) {
  try {
    // Check if the email is already taken
    let found = await Student.findOne({ user });
    if (found) {
      // return res.status(400).json({ msg: 'Email already taken' });
      throw new Error('Email already taken');
    }
    const user = await User.create({ name, email, password });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Must be on top so 'withaddress' route is not interpreted as an id.
router.get('/withaddress', async (req, res) => {
  console.log("GETTING USERS: " );
  const persons = await User.find().populate('address');
  return res.json(persons);
});

router.get('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 'msg': 'User not found' });
    }
    await User.findByIdAndDelete(userId);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    console.log("USER: ", userData);
    let newUser = null;
    if (userData.hasOwnProperty('address')) {
      const newAddress = await Address.create(userData.address);
      delete userData.address;
      newUser = new User(userData);
      newUser.address = newAddress._id;
    } else {
      newUser = new User(userData);
    }
    await newUser.save();
    res.status(200).json({ success: true, msg: 'User saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});


router.post('/addressuser', async (req, res) => {
  try {
    // Retrieve the address for the person
    const address = await Address.findById(req.body.addressId);
    console.log("ADDRESS: ", address);
    if (!address) {
      return res.status(400).json({ message: 'Invalid address ID' });
    }

    // Create the new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // https://stackoverflow.com/a/69495707 
  // Remove the version key from the update DTO (if present) to avoid a version conflict error when saving to the database below (see https://mongoosejs.com/docs/faq.html#versionkey)
  // Better way would be to reload the user client side when updating, but this is a quick fix. 
  delete req.body.__v;
  const updateDTO = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("USER: ", user);

    // Update user object with fields from DTO
    Object.assign(user, updateDTO);

    // Save updated user object to database
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: `Failed to update user: ${err}` });
  }
});

// Protected endpoint:
router.get('/protected', verifyToken, (req, res) => {
  const response = {
    message: 'This is a protected endpoint!',
    user: req.user,
  };
  res.json(response);
});

// Protected endpoint with token refresh:
router.get('/test_refresh', refreshToken, (req, res) => {
  const response = {
    message: 'This is a protected endpoint!',
    user: req.user,
  };
  res.json(response);
});

// validate token:
router.get('/validatetoken', verifyToken, (req, res) => {
  const response = {
    message: 'valid',
  };
  res.json(response);
});

module.exports = router;