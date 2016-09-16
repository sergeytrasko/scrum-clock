import React, {Component} from 'react';
import './ClockFace.css';
import ClockFaceBackground from './ClockFaceBackground';

class ClockFace extends Component {

    constructor() {
        super();
        this.startSelectTime = this.startSelectTime.bind(this);
        this.finishSelectTime = this.finishSelectTime.bind(this);
        this.moving = this.moving.bind(this);
        this.finishSelectTime = this.finishSelectTime.bind(this);
        this.initSound = this.initSound.bind(this);
    }

    initSound() {
        if (!this.audio) {
            this.audio = new Audio(require('../../timeover.mp3'));
            this.audio.play();
            this.audio.pause();
        }
    }

    startTimer(minutes) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setInterval(() => {
            minutes--;
            this.showTime(minutes);
            if (minutes <= 0) {
                clearTimeout(this.timer);
                this.initSound();
                this.audio.play();
            }
        }, 1000);
    }

    showTime(minutes) {
        const angle = minutes * 6, rotatedAngle = 90 - angle;
        let style;
        if (angle > 180) {
            style = `linear-gradient(90deg,red 50%,transparent 50%),linear-gradient(${rotatedAngle}deg,transparent 50%,red 50%)`;
        } else {
            style = `linear-gradient(90deg,transparent 50%,white 50%),linear-gradient(${rotatedAngle}deg,transparent 50%,red 50%)`;
        }

        const element = this.refs.face;
        element.style.backgroundImage = style;
    }

    selectTime(event) {
        const minutes = this.showTimeFromEvent(event);
        this.startTimer(minutes);
    }

    showTimeFromEvent(event) {
        const elementDimension = this.refs.face.getBoundingClientRect();

        const dx = elementDimension.width / 2 - event.nativeEvent.offsetX;
        const dy = elementDimension.height / 2 - event.nativeEvent.offsetY;
        let angle = 90 - Math.atan(1.0 * dy / dx) * 180 / Math.PI;
        if (dx < 0) {
            angle += 180;
        }
        const minutes = Math.round(angle / 6);
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
            onMouseDown={this.startSelectTime}
            onMouseUp={this.finishSelectTime}
            onMouseMove={this.moving}
            onMouseOut={this.finishSelectTime}
            onTouchStart={this.initSound}
            className='clock-face-container'>
            <div ref='face' className='clock-face'></div>
            <ClockFaceBackground/>
        </div>
    }
}

export default ClockFace;