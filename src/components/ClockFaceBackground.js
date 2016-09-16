import React from 'react';
import './ClockFaceBackground.css';
import Tick from './Tick';

const ticks = (count, prefix) => {
    return [...new Array(count)].map((i, value) => (<Tick key={`${prefix}-${value}`}
                                                      prefix={prefix}
                                                      totalCount={count}
                                                      value={value}/>));
};

const ClockFaceBackground = () => (<div className='face-background'>
    {ticks(12, 'hour')}
    {ticks(60, 'minute')}
</div>);

export default ClockFaceBackground;