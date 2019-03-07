const express = require('express');
const router = express.Router();
const Countries = require('../models/country');

//get top 5 countries based on number of universities by have
router.get('', (req, res, next) => {
    Countries.find({})
    .then(result => {
        console.log(result)
        result.sort((a,b) => {
            return b.universities.length-a.universities.length
        })
        let array = result.slice(0,5);
        let topFivecountries = array.map(obj => {
            let ob = {countryName:obj.countryName, numUniversities:obj.universities.length}
            return ob
        }) 
        res.send(topFivecountries)
    })
    .catch(err => {
        res.send(err);
    })
})




module.exports = router;