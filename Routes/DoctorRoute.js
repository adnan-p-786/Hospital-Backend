const express = require('express')
const doctormodel = require ('../models/Doctor')
const router = express.Router()

router.post('/post',async(req,res)=>{
    try {
        const {Name,Department} = req.body
        if (!Name || !Department){
            return res.status(400).json({message: "Name and Department are required"})
        }
        const newData = await doctormodel.create({Name,Department})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await doctormodel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router