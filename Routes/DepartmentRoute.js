const express = require('express')
const departmentmodel = require ('../models/Department')
const router = express.Router()

router.post('/post',async(req,res)=>{
    try {
        const {Name} = req.body
        if (!Name){
            return res.status(400).json({message: "Name required"})
        }
        const newData = await departmentmodel.create({Name})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await departmentmodel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await departmentmodel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "department not found" });
        }
        res.status(200).json({ message: "department deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router