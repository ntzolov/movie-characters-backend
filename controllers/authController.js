const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = 'mG8tdLPPNJ0wpEOI0DnKz5YCEuJMbcGp';
const { mongoErrorHandler } = require('../utils/mongoErrorHandler');

const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword) {
      return res.status(406).json({ message: 'All fields are required!' });
    }

    if (password !== rePassword) {
      return res.status(406).json({ message: "Password doesn't match!" });
    }

    const isDuplicateUser = await User.findOne({ username }).lean();

    if (isDuplicateUser) {
      return res.status(406).json({ message: 'User already exist!' });
    }

    const user = await User.create({ username, password });

    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const result = {
      username: user.username,
      _id: user._id,
      isAdmin: user.isAdmin,
      token,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(406).json({ message: 'Username or Password not valid!' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(406).json({ message: 'Username or Password not valid!' });
    }

    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const result = {
      username: user.username,
      _id: user._id,
      isAdmin: user.isAdmin,
      token,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.get('/logout', (req, res) => {});

module.exports = router;

// if (sort === 'nameAZ') {
//   characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ name: 1 });
// } else if (sort === 'nameZA') {
//   characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ name: -1 });
// } else if (sort === 'mostLiked') {
//   characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ likes: 1 });
// } else {
//   characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } });
// }
