const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    DepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    DoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true
    }
})


module.exports = mongoose.model('appointment', appointmentSchema)