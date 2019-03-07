const mongoose = require('mongoose');
const university = require('./university')

const countrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName:{
        type: String,
        required: true
    },
    countryFlag: {
        type: String,
        required: false
    },
    universities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'university'
    }]
})

module.exports = mongoose.model('country',countrySchema);