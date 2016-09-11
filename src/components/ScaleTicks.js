import React from 'react';
import './ScaleTicks.css';

export default class ScaleTicks extends React.Component {
    tickElement(prefix, totalCount, value) {
        var rotate = 'rotate(' + (90 - value * (360 / totalCount)) + 'deg)';
        const style = {
            transform: rotate,
            WebkitTransform: rotate
        };
        const key = prefix + value;
        return <div key={key} className={prefix + '-line'} style={style}><div className={prefix + '-tick'}></div></div>
    }

    render() {
        return <div ref='parent' className='scale-ticks'>
            {[...Array(12)].map((i, value) => {
                return this.tickElement('hour', 12, value);
            })}
            {[...Array(60)].map((i, value) => {
                return this.tickElement('minute', 60, value);
            })}
        </div>
    }
}