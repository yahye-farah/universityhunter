const express = require('express');
const router = express.Router();
const Department = require('../models/department');

//get top 5 countries based on number of universities by have
router.get('', (req, res, next) => {
    Department.find({})
    .then(result => {
        console.log(result)
        result.sort((a,b) => {
            return b.courses.length-a.courses.length
        })
        let array = result.slice(0,5);
        let topFivecountries = array.map(obj => {
            let ob = {departmentName:obj.departmentName, numCourses:obj.courses.length}
            return ob
        }) 
        res.send(topFivecountries)
    })
    .catch(err => {
        res.send(err);
    })
})
//find based on department
router.post('/department', (req, res, next) => {
    Department.find({departmentName: req.body.departmentName}).populate({
        path:"courses",
        // select:"universityName",
        populate:{
          path:"university",
        //   select:"countryName"
        }
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
 
})

//get specific department


module.exports = router;