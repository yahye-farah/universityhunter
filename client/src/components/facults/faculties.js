import React, {Component} from 'react';
import FacultCart from './facultCart'

let  TopCourses = (props) => {
    
     {
        return(
            <FacultCart 
            topDepartments = {props.topDepartments}
            seletedCountryorDepartment= {props.seletedCountryorDepartment}
            allCourses= {props.allCourses}
            />
        )
    }
}

export default TopCourses