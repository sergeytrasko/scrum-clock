import React from 'react';
import ClockFace from './ClockFace';
import MinuteDigit from './MinuteDigit';

const minuteDigits = (size) => {
    return [...new Array(12)].map((x, i) => (<MinuteDigit key={i}
                                               radius={size / 2}
                                               center={size / 2}
                                               value={i}/>)
    );
};

const Clock = (props) => {
    const {size} = props;
    const border = size / 12.0;
    const style = {
        width: size + 'vmin',
        height: size + 'vmin',
        border: border + 'vmin solid black',
        borderRadius: border + 'vmin',
        position: 'relative'
    };
    return <div style={style}>
        <ClockFace />
        {minuteDigits(size)}
    </div>
};

Clock.propTypes = {
    size: React.PropTypes.number
};

export default Clock;