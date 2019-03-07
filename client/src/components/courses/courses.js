import React, {Component} from 'react';
import CourseCard from './coursecard';

class Courses extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.courses.length > 0) {
            return (
                <div>
                {this.props.courses.map(course => (
                    <CourseCard course = {course}
                    increaseViewers = {this.props.increaseViewers}
                    />
                  ))}
                  </div>
            )
        }else {
            return (
            <h6>Loading....</h6>
            )
        }
        
    }
}

export default Courses;