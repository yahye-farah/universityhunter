import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    display: "fluid"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class LocationExpension extends Component {
  state = {
    gilad: false,
    jason: false,
    antoine: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes } = this.props;
    const { gilad, jason, antoine } = this.state;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gilad}
                  onChange={this.handleChange("gilad")}
                  value="gilad"
                />
              }
              label="PHD"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jason}
                  onChange={this.handleChange("jason")}
                  value="jason"
                />
              }
              label="Masters Degree"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={antoine}
                  onChange={this.handleChange("antoine")}
                  value="antoine"
                />
              }
              label="Bachelor Degree"
            />
                <FormControlLabel
              control={
                <Checkbox
                  checked={antoine}
                  onChange={this.handleChange("antoine")}
                  value="antoine"
                />
              }
              label="Diploma"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

LocationExpension.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationExpension);
