const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('doctor',doctorSchema)