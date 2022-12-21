const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Station = require('../models/Station');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).json(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

router.get('/users/count', async (req, res) => {
  try {
    
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
     console.log(error);
     
  }
});
router.get('/users/count/:id', async (req, res) => {
  const {id} = req.params;
  const stations = await Station.find({userId: id}).sort({ createdAt: -1 });
  res.status(200).json(stations);
});

module.exports = router;
