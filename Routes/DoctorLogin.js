const express = require('express')
const DoctorLoginModel = require('../models/Doctor')
const jwt = require('jsonwebtoken')

const router = express.Router()


router.post('/login-doctor', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password ) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const doctor = await DoctorLoginModel.findOne({ Email });

        if (!doctor) {
            return res.status(404).json({ success: false, message: "doctor does not exist" });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            data: {
                token,
                id: doctor._id,
                Email: doctor.Email,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;