const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const University = require("../models/university");
const Depart = require("../models/department");
const mongoose = require('mongoose')

//save new course to the database

router.post("/new", (req, res, next) => {
  //check if the department exists
  Depart.find({ departmentName: req.body.departmentName })
    .then(department => {
      if (department.length > 0) {
        //if the department exists
        department = department[0]
        const course = new Course({
          university: req.body.id,
          department: department._id,
          courseName: req.body.courseName,
          courseLevel: req.body.courseLevel,
          price: req.body.price,
          GPA: req.body.GPA,
          description: req.body.description,
          postedTime: new Date()
        });
        course.save().then(course => {
          department.courses.push(course._id);
          department.save();
          res.send(course)
        })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("jjjjjjjjj");
        console.log(req.body.departmentName)
        //if the department doest exist
        const department = new Depart({
          _id: new mongoose.Types.ObjectId(),
          departmentName: req.body.departmentName
        })
        console.log(department)
        department.save()
        .then(depart => {
            console.log("depart", depart);
            const course = new Course({
              university: req.body.id,
              department: depart._id,
              courseName: req.body.courseName,
              courseLevel: req.body.courseLevel,
              price: req.body.price,
              GPA: req.body.GPA,
              description: req.body.description,
              postedTime: new Date()
            });
            course.save().then(course => {
              depart.courses.push(course._id);
              depart.save();
              res.send(course);
            });
          })
          .catch(err => {
            res.send(err);
          });
      }
    })
    .catch(err => {
      res.send(err);
    });

  //make new course

  // const course = new Course({
  //     university: req.body.id,
  //     courseName: req.body.courseName,
  //     courseLevel: req.body.courseLevel,
  //     price: req.body.price,
  //     GPA: req.body.GPA,
  //     description: req.body.description,
  //     postedTime: new Date()
  // })
  // course.save().then(course => {
  //     University.findById({_id:req.body.id}).then((university) => {
  //         university.courses.push(course._id);
  //         university.save().then(() => {
  //             res.send('Successfuly saved course!')
  //         })
  //     })
  // })
  // .catch(err => {
  //     console.log(err);
  //     res.send('Error occured');
  // })
});

//get all the courses
//Note just get top 10 for user experience
router.get("", (req, res, next) => {
  Course.find({})
    .populate({
      path:"university",
      select:"universityName",
      populate:{
        path:"location",
        select:"countryName"
      }
    })
    .limit(5)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send("Something went wrong");
    });
});

//increase number of viewers a specific course
router.post("/increaseviewers", (req, res, next) => {
  Course.findById({ _id: req.body.id })
    .then(course => {
      course.viewTimes++;
      course.save();
      console.log("lllllll", course.viewTimes);
      res.send(course);
    })
    .catch(err => {
      console.log(err);
      res.send("Something went Wrong");
    });
});

///////////////////////////////
//increase search count for the course if it is searched

///*********** increase the search count i will come back to it
///////////////////////////////////////

//search course by course name

router.post("/coursename", (req, res, next) => {
  Course.find({ courseName: req.body.courseName })
    .then(course => {
      res.send(course);
    })
    .catch(err => {
      console.log(err);
      res.send("Something went wrong");
    });
});

//search course based by it's level
router.post("/courselevel", (req, res, next) => {
  Course.find({ courseLevel: req.body.courseLevel })
    .populate("university", "universityName")
    .then(course => {
      res.send(course);
    })
    .catch(err => {
      console.log(err);
      res.send("Something went wrong");
    });
});

//search course by it's GPA

router.post("/gpa", (req, res, next) => {
  Course.find({})
    .where("GPA")
    .gt(req.body.first - 1)
    .lt(req.body.last)
    .populate({
      path:"university",
      select:"universityName",
      populate:{
        path:"location",
        select:"countryName"
      }
    })
    .then(course => {
      res.send(course);
    })
    .catch(err => {
      console.log(err);
      res.send("Something went wrong");
    });
});

//get latest  posted courses
router.get("/latest", (req, res, next) => {
  Course.find({}, null, { sort: { postedTime: -1 } }).populate({
    path:"university",
    select:"universityName",
    populate:{
      path:"location",
      select:"countryName"
    }
  })
    .limit(2)
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

//search course by it's price

router.post("/price", (req, res, next) => {
  console.log(req.body.first);
  console.log(req.body.last);
  Course.find({})
    .where("price")
    .gt(req.body.first - 1)
    .lt(req.body.last)
    .populate({
      path:"university",
      select:"universityName",
      populate:{
        path:"location",
        select:"countryName"
      }
    })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send("Error Occured");
    });
});

//get courses got largest number of viewers
router.get("/views", (req, res, next) => {
  Course.find({}, null, { sort: { viewTimes: -1 } }).limit(2).populate({
    path:"university",
    select:"universityName",
    populate:{
      path:"location",
      select:"countryName"
    }
  })
    .then(courses => {
      console.log('most viewed',courses);
      res.send(courses);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

//get courses by their countries
router.post("/countries", (req, res, next) => {
  console.log('hey')
  console.log(req.body)
   Course.find({}).populate({
    path:"university",
    select:"universityName",
    populate:{
      path:"location",
      select:"countryName"
    }
  }).exec((err, course) => {
    if(err){
      return err;
    }
    console.log('jow',course)
    res.send(course)
  //  var courses= course.filter(course => course.university.location.countryName === req.body.countryName)
  //  console.log('...',courses)
  //  res.send(courses)
  })
    
});

//get top five departments e.g engineering medicine

//get courses by their countries
router.post("/departmenties", (req, res, next) => {
  console.log('departmenties')
  console.log('yahya',req.body)
  Course.find({}).populate('department').populate({
    path:"university",
    select:"universityName",
    populate:{
      path:"location",
      select:"countryName"
    }
  }).exec((err, course) => {
    if(err){
      return err;
    }
    console.log('ooo',course)
   var courses= course.filter(course => course.department.departmentName === req.body.departmentName)
   console.log('...',courses)
   res.send(courses)
  })
    
});


module.exports = router;
