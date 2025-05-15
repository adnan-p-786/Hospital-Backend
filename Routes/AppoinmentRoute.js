const express = require('express')
const appointmentModel = require ('../models/Appointment')
const router = express.Router()

router.post('/post',async(req,res)=>{
    try {
        const {Name,Gender,Email,Phone,Date,Time,Doctor,Department,Message} = req.body
        if (!Name || !Gender || !Email || !Phone ||!Date ||!Time ||!Doctor ||!Department ||!Message){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await appointmentModel.create({Name,Gender,Email,Phone,Date,Time,Doctor,Department,Message})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await appointmentModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router