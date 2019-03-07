import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FacultExpension from './expensionContent';

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class LocationExpension extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    // const { gilad, jason, antoine } = this.state;
    console.log("mmm", this.props.topDepartments);

    if(this.props.topDepartments.length > 0) {
      return (
        <div>
                  
                  <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                  {this.props.topDepartments.map(department => {
                    return(
                      <FacultExpension department = {department}
                      seletedCountryorDepartment={this.props.seletedCountryorDepartment}
                      allCourses = {this.props.allCourses}
                      />
                  )})}
                  </FormGroup>
                </FormControl>
      </div>
      )
  }else {
      return (
      <h6>Loading....</h6>
      )
  }

  }
}

LocationExpension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationExpension);
