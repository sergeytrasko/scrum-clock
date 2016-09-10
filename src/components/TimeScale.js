import React from 'react';
import './TimeScale.css';
import ScaleTicks from './ScaleTicks';

export default class TimeScale extends React.Component {

    startTimer(minutes) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setInterval(() => {
            minutes--;
            this.showTime(minutes);
            if (minutes <= 0) {
                clearTimeout(this.timer);
                let audio = new Audio(require('../../timeover.mp3'));
                audio.play();
            }
        }, 1000);
    }

    showTime(minutes) {
        var angle = minutes * 6;
        var style = '';
        if (angle > 180) {
            style = 'linear-gradient(90deg, red 50%, transparent 50%),' +
                'linear-gradient(' + (90 - angle) + 'deg, transparent 50%, red 50%)';
        } else {
            style = 'linear-gradient(90deg, transparent 50%, white 50%), ' +
                'linear-gradient(' + (90 - angle) + 'deg, transparent 50%, red 50%)';
        }

        const element = this.refs.scale;
        element.style.backgroundImage = style;
    }

    selectTime(event) {
        const minutes = this.showTimeFromEvent(event);
        this.startTimer(minutes);
    }

    showTimeFromEvent(event) {
        const element = this.refs.scale;
        const elementDimension = element.getBoundingClientRect();

        var x = event.nativeEvent.offsetX;
        var y = event.nativeEvent.offsetY;
        var centerX = elementDimension.width / 2;
        var centerY = elementDimension.height / 2;
        var dx = centerX - x;
        var dy = centerY - y;
        var angle = 90 - Math.atan(1.0 * dy / dx) * 180 / Math.PI;
        if (dx < 0) {
            angle += 180;
        }
        var minutes = Math.round(angle / 6);
        this.showTime(minutes);
        return minutes;
    }

    startSelectTime() {
        this.selecting = true;
    }

    finishSelectTime(event) {
        if (this.selecting) {
            this.selecting = false;
            this.selectTime(event);
        }
    }

    moving(event) {
        if (this.selecting) {
            this.showTimeFromEvent(event);
        }
    }

    render() {
        return <div
            onMouseDown={this.startSelectTime.bind(this)}
            onMouseUp={this.finishSelectTime.bind(this)}
            onMouseMove={this.moving.bind(this)}
            onMouseOut={this.finishSelectTime.bind(this)}
            className='time-scale-container'>
            <div ref='scale' className='time-scale'></div>
            <ScaleTicks/>
        </div>
    }
}