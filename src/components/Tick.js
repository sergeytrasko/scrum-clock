import React from 'react';

const Tick = (props) => {
    const {prefix, value, totalCount} = props;
    const angle = 90 - value * (360 / totalCount);
    const rotate = `rotate(${angle}deg)`;
    const style = {
        transform: rotate,
        WebkitTransform: rotate
    };
    return <div className={`${prefix}-line`} style={style}><div className={`${prefix}-tick`}></div></div>
};

Tick.propTypes = {
    prefix: React.PropTypes.string,
    value: React.PropTypes.number,
    totalCount: React.PropTypes.number
};

export default Tick;