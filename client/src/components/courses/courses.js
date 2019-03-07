import React, {Component} from 'react';
import CourseCard from './coursecard';
import Loading from '../loading/loading'

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
            <Loading />
            )
        }
        
    }
}

export default Courses;