const express = require('express')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

// Create Doctor/Admin
router.post('/create', async (req, res) => {
    try {
        const { Name, Email, Password, Role } = req.body

        if (!Name || !Email || !Password || !Role) {
            return res.status(400).json({ message: "Name, Email, Password, and Role are required" })
        }

        if (!['Doctor', 'Admin'].includes(Role)) {
            return res.status(400).json({ message: "Role must be either 'Doctor' or 'Admin'" })
        }

        const existingUser = await userModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = await userModel.create({
            Name,
            Email,
            Password: hashedPassword,
            Role
        });

        const token = jwt.sign({ id: newUser._id, role: newUser.Role }, process.env.JWT_SECRET);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                Name: newUser.Name,
                Email: newUser.Email,
                Role: newUser.Role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all users (admin only, typically)
router.get('/get', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Doctor/Admin
router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ Email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.Role }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: user._id,
                Email: user.Email,
                Role: user.Role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
