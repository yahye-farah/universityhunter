const express = require('express');
const router = express.Router();
const University = require('../models/university');
const Country = require('../models/country')
const mongoose = require('mongoose');

//save new university to our database
router.post('/new', (req, res, next) => {
    console.log('you reached her')
    //check if we have this country before
    Country.find({countryName: req.body.countryName}).
    then(country => {
        
        if(country.length > 0) {
            //we have this country
            const countryid = country[0]['_id'];
            console.log('mmm',countryid)
            //check if the university exists
            University.find({universityName: req.body.universityName})
            .then(result => {
                if(result.length > 0) {
                    res.send('This university already exists')
                }else {
                    //make new univeristy
                    
                    const university = new University({
                        _id: new mongoose.Types.ObjectId(),
                        universityName: req.body.universityName,
                        location: countryid
                    })
                    university.save()
                    .then(result => {
                        console.log(',,,,',country[0])
                        country = country[0]
                        country.universities.push(result._id);
                        country.save().then(result =>{
                            res.send('Successfuly Saved')
                        }).catch(err => {
                            res.send(err);
                        })
                    }).catch(err => {
                        res.send(err)
                    })
                }
            }).catch(err => {
                res.send(err);
            })

        }else {
            //make new country
            const country = new Country({
                _id: new mongoose.Types.ObjectId(),
                countryName: req.body.countryName,
            })
            country.save().then(country => {
                //make new university
                const university = new University({
                    _id: new mongoose.Types.ObjectId(),
                    universityName: req.body.universityName,
                    location: country._id 
                })
                university.save()
                .then(result => {
                    country.universities.push(result._id);
                    country.save()
                    res.send('Successfuly Saved')
                })
            })
            .catch(err => {
                res.send(err);
            })

        }
    }).catch(err => {
        console.log(err)
        res.send(err);
    })
    







    // const university = new University({
    //     _id: new mongoose.Types.ObjectId(),
    //     universityName: req.body.universityName,
    //     location: req.body.location
    // })
    // university.save().then(result  => {
    //     res.send(result)
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.send("Something went wrong");
    // })
})

//find all universities based on their location

router.post('/location', (req, res, next) => {
    University.find({location: req.body.location})
    .then(result => {
        if(result.length === 0) {
            res.send("No Universities in this location");
        }
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send('Something went wrong')
    })
})

//search specific university by its name

router.post('/:universityname', (req, res, next) => {
    University.find({universityName: req.params.universityname}).populate('courses')
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send('Something went Wrong')
    })
})

//get top 5 countries that have highest number of courses

// router.get('/topCountries', (req, res, next) => {
//     University.find({}).
// })

module.exports = router;