const mongoose = require('mongoose');
const univeristy = require('./university')

const courseSchema = mongoose.Schema({
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'univeristy'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    },
    courseName: {
        type: String,
        required: true
    },
    courseLevel: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    GPA: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedTime: {
        type: String
    },
    searchedTimes: {
        type: Number,
        default: 0
    },
    viewTimes: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('course', courseSchema);