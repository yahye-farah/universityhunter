const mongoose = require('mongoose');
course = require('./course')

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
        type: String,
        required: true
    },
    courses: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'course'}
    ]
})

module.exports = mongoose.model('department',departmentSchema);