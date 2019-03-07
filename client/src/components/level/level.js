import React, {Component} from 'react';
import LevelCart from './levelCard';
import './level.css'

class Level extends Component {
    

    render() {
        return(
            <div className='levelexpensation'>
            <LevelCart />
            </div>
        )
    }
}

export default Level