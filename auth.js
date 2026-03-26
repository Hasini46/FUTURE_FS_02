const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST /api/auth/setup - No auth needed
router.post('/setup', async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: req.body.username });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });
    const admin = new Admin({ 
      username: req.body.username, 
      password: req.body.password 
    });
    await admin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login - No auth needed
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: admin._id, username: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;