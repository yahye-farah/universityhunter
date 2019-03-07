import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SmallContent from "./expenstionContent";

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
    // const { gilad, jason, antoine } = this.state

    if (this.props.topCountries.length > 0) {
      return (
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              {this.props.topCountries.map(country => {
                return <SmallContent country={country} 
                seletedCountryorDepartment = {this.props.seletedCountryorDepartment}
                allCourses = {this.props.allCourses}
                />;
              })}
            </FormGroup>
          </FormControl>
        </div>
      );
    } else {
      return <h6>Loading....</h6>;
    }
  }
}

LocationExpension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationExpension);
