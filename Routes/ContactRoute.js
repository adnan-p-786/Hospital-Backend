const express = require('express')
const contactModel = require ('../models/Contact')
const router = express.Router()

router.post('/post',async(req,res)=>{
    try {
        const {Name,Email,Subject,Message} = req.body
        if (!Name || !Email || !Subject ||!Message){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await contactModel.create({Name,Email,Subject,Message})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router