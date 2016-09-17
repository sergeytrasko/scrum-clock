import React from 'react';
import './Clock.css';
import ClockFace from './ClockFace';
import MinuteDigit from './MinuteDigit';

const minuteDigits = () => {
    return [...new Array(12)].map((x, i) => (<MinuteDigit key={i}
                                               value={i}/>)
    );
};

const Clock = () => {
    return <div className='clock'>
        <div className='clock-inner'>
            <ClockFace />
            {minuteDigits()}
        </div>
    </div>
};

Clock.propTypes = {
    size: React.PropTypes.number
};

export default Clock;