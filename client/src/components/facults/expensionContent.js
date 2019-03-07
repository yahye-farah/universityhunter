
import React, {Component} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class smallExpenstion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Medicine: false,
          Engineering: false,
          Science: false,
          Arts: false

        }
    }

    handleChange = name => event => {
      //console.log(this.state.Jordan)
        this.setState({ [name]: !this.state[`${name}`] }, () => {
          if(this.state[`${name}`]) {
            this.props.seletedCountryorDepartment('departmenties','departmentName',name)
          }else {
            //get all of them
            this.props.allCourses()
          }
        });
      };
    render() {
      let department = this.props.department.departmentName
        return (
            <FormControlLabel
            control={
              <Checkbox
              checked={this.state.department}
                onChange={this.handleChange(this.props.department.departmentName)}
                value={this.props.department.departmentName}
              />
            }
            label={this.props.department.departmentName}
          />
        )
    }
}


export default smallExpenstion;