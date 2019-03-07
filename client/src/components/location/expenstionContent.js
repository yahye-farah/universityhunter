import React, {Component} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class smallExpenstion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Jordan: false,
            Turkey: false,
            USA: false,
            UK: false

        }
    }

    handleChange = name => event => {
      //console.log(this.state.Jordan)
        this.setState({ [name]: !this.state[`${name}`] }, () => {
          if(this.state[`${name}`]) {
            this.props.seletedCountryorDepartment('countries','countryName',name)
          }else {
            //get all of them
            this.props.allCourses()
          }
        });
      };
    render() {
        let country = this.props.country.countryName
        console.log('country',country)
        return (
            <FormControlLabel
            control={
              <Checkbox
                checked={this.state.country}
                onChange={this.handleChange(this.props.country.countryName)}
                value={this.props.country.countryName}
              />
            }
            label={this.props.country.countryName}
          />
        )
    }
}


export default smallExpenstion;