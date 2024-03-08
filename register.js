const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Import the User model or your database connection
const User = require('../models/User');

// Route for user registration
router.post('/', async (req, res) => {
    try {
        const { email, password, type } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record
        const newUser = new User({
            email,
            password: hashedPassword,
            type,
            active: true
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
