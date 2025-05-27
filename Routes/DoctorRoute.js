const express = require('express')
const doctormodel = require ('../models/Doctor')
const router = express.Router()
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const uploadImg = multer({ storage: storage });

  router.get("/upload/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    // console.log(imageName);
    
    const imagesFolder = path.join(__dirname, "../upload", "images");
    // console.log(imagesFolder);
    
    const imagePath = path.join(imagesFolder, imageName);
  
    // Check if the file exists and send it
    res.sendFile(imagePath);

  })



router.post('/post',uploadImg.single("image"),async(req,res)=>{
    try {
      const image_url = `http://localhost:3000/api/doctor/upload/images/${req.file.filename}`;
        const {Name,DepartmentId} =req.body
        console.log({Name});
        console.log({DepartmentId});
        
        if (!Name || !DepartmentId){
            return res.status(400).json({message: "Name and Department are required"})
        }
        const newData = await doctormodel.create({Name:Name, DepartmentId:DepartmentId,image: image_url})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get', async (req, res) => {
    try {
        const data = await doctormodel.find()
        .populate('DepartmentId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id; 
      const deleteData = await doctormodel.findByIdAndDelete(id);
      if (!deleteData) {
        return res.status(404).json({ message: "doctor not found" });
      }
      res.status(200).json({ message: "doctor deleted successfully", deletedProduct: deleteData });
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router