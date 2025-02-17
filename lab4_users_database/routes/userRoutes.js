const express = require('express');
const User = require('../models/userModel'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phone,
      website,
      address,
      company,
    } = req.body;

    const newUser = new User({
      name,
      username,
      email,
      phone,
      website,
      address, 
      company, 
    });

    
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
});

module.exports = router;
