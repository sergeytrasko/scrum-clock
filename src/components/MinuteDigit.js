import React from 'react';
import './MinuteDigit.css';

export default class MinuteDigit extends React.Component {
    render() {
        const {radius, value, center} = this.props;
        const radians = (2 * Math.PI) * (1.0 * value * 30 / 360);
        const angle = 3 * Math.PI / 2 - radians;
        const style = {
            top: (center + Math.round(Math.sin(angle) * radius) * 0.9 - 10) + 'vmin',
            left: (center + Math.round(Math.cos(angle) * radius) * 0.9 - 10) + 'vmin'
        };
        return <div className='minute-digit' style={style}>{value * 5}</div>
    }
}

MinuteDigit.propTypes = {
    radius: React.PropTypes.number,
    value: React.PropTypes.number,
    center: React.PropTypes.number
};