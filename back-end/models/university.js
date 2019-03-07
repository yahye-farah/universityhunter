const mongoose = require('mongoose');
course = require('./course');
country = require('./country')

const universitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    universityName:{
        type:String,
        required:true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
})


module.exports = mongoose.model('univeristy', universitySchema);