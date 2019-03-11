import React, { Component } from "react";
import AppBar from "./components/appBar/appBar";
import Courses from "./components/courses/courses";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Universities from "./components/universities/university";
import Location from "./components/location/location";
import Level from "./components/level/level";
import TopFacults from "./components/facults/faculties";
import axios from "axios";
import Filters from "./components/searchFilters/searchFilters";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      topCountries: [],
      topDepartments: []
    };
  }
  componentDidMount() {
    //fetch all courses
    axios
      .get("/course")
      .then(data => {
        this.setState({
          courses: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    //fetch topDepartments
    axios
      .get("/department")
      .then(data => {
        this.setState({
          topDepartments: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    //fetch topCountries
    axios
      .get("/country")
      .then(data => {
        this.setState({
          topCountries: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //fetch all courses
  allCourses = () => {
    console.log("hey");
    axios
      .get("/course")
      .then(data => {
        this.setState({
          courses: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //search filters posted Recently OR based on the number of viewers
  postedRecently = latestorviewed => {
    console.log(latestorviewed);
    axios
      .get(`/course/${latestorviewed}`)
      .then(result => {
        this.setState({
          courses: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //GPA filter and Price filter
  GPAfilter = (priceORgpa, first, last) => {
    console.log(first);
    console.log(last);
    axios
      .post(`/course/${priceORgpa}`, { first: first, last: last })
      .then(result => {
        this.setState({
          courses: result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // increase number of viewers on specific course

  increaseViewers = id => {
    axios
      .post(`/course/increaseviewers`, { id: id })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //search selected country or facult
  seletedCountryorDepartment = (countryordepartment, name, value) => {
    console.log(name);
    console.log("valueeee", value);
    console.log("path", countryordepartment);
    if (name === "countryName") {
      axios
        .post(`/course/${countryordepartment}`, { countryName: value })
        .then(result => {
          this.setState({
            courses: result.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`/course/${countryordepartment}`, { departmentName: value })
        .then(result => {
          console.log("uuuu", result.data);
          this.setState({
            courses: result.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  filter = (search) => {
    let filtered = this.state.courses.filter(item => {
      if(item.university.universityName.toLocaleLowerCase() === search.toLocaleLowerCase()
       || item.courseName.toLocaleLowerCase() === search.toLocaleLowerCase() 
       || item.university.location.countryName.toLocaleLowerCase() === search.toLocaleLowerCase()
       || item.courseLevel.toLocaleLowerCase()  === search.toLocaleLowerCase()
       ){
          return item;
      }
  })
  this.setState({
    courses:filtered
  })
  }

  render() {
    console.log("courses", this.state.courses);
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar filter={this.filter} />
        <div>
          <Grid container spacing={24} alignItems="center" justify="center">
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Filters
                  postedRecently={this.postedRecently}
                  allCourses={this.allCourses}
                  GPAfilter={this.GPAfilter}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Grid container justify={"center"}>
            <Grid item xs={12} sm={3}>
            <Paper>
              
                <Universities />
            
              
                <Universities />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
            
              <Courses
                courses={this.state.courses}
                increaseViewers={this.increaseViewers}
              />
            
            </Grid>
            <Grid item xs={12} sm={3}>
              
                <Location
                  topCountries={this.state.topCountries}
                  seletedCountryorDepartment={this.seletedCountryorDepartment}
                  allCourses={this.allCourses}
                />
            
              
                <TopFacults
                  topDepartments={this.state.topDepartments}
                  seletedCountryorDepartment={this.seletedCountryorDepartment}
                  allCourses={this.allCourses}
                />
              
              
                <Level />
              
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
