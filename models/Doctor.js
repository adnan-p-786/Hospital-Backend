const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    DepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('doctor', doctorSchema)