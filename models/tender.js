const mongoose = require('mongoose')

const TenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
 
    buffer_time: {
        type: Number,
        default: 0
    }
}, { timestamps: true }) // jab hum insert krenge to 2 field dega created data and insert data time and date
const TenderModel = mongoose.model('tender', TenderSchema)
module.exports = TenderModel