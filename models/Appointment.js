const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true 
    },
    Phone:{
        type:Number,
        required:true 
    },
    Date:{
        type:String,
        required:true 
    },
    Time:{
        type:String,
        required:true
    },
    Doctor:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('appointment',appointmentSchema)