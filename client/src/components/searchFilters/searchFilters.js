import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GpaMenu from "./GPAMenu";
import PriceMenu from './priceMenu'

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
};

class CheckboxLabels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedA: false,
      checkedB: false,
      checkedG: false
    };
  }

  handleChange = name => event => {
    event.preventDefault()
    this.setState({ [name]: event.target.checked }, () => {
      if(this.state.checkedG) {
        this.props.postedRecently('latest')
      }else if(this.state.checkedB) {
        this.props.postedRecently('views')
      } else if(this.state.checkedA){
        //invoke most searched course
        console.log('invoke most searched course')
      } else {
        this.props.allCourses()
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange("checkedA")}
              value="checkedA"
            />
          }
          label="Most Searched"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange("checkedB")}
              value="checkedB"
              color="primary"
            />
          }
          label="Most Viewed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange("checkedG")}
              value="checkedG"
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label="Posted Recently"
        />
      <PriceMenu GPAfilter={this.props.GPAfilter}/>
        <GpaMenu GPAfilter= {this.props.GPAfilter}/>
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxLabels);
