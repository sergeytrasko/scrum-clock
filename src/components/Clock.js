import React from 'react';
import TimeScale from './TimeScale';
import MinuteDigit from './MinuteDigit';

export default class Clock extends React.Component {
    render() {
        const {size} = this.props;
        const border = size / 12.0;
        const style = {
            width: size + 'vmin',
            height: size + 'vmin',
            border: border + 'vmin solid black',
            borderRadius: border + 'vmin',
            position: 'relative'
        };
        return <div style={style}>
            <TimeScale />
            {[...Array(12)].map((x, i) => <MinuteDigit key={i} radius={size / 2} center={size / 2} value={i}/>)}
        </div>
    }
}

Clock.propTypes = {
    size: React.PropTypes.number
};