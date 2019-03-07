import React, {Component} from 'react';
import LocationCard from './locationCard'

class Location extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <LocationCard 
            seletedCountryorDepartment= {this.props.seletedCountryorDepartment}
            topCountries = {this.props.topCountries}
            allCourses = {this.props.allCourses}
            />
        )
    }
}

export default Location