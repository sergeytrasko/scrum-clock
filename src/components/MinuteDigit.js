import React, {Component} from 'react';
import './MinuteDigit.css';

class MinuteDigit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            labelFontSize: 20
        };
    }

    calculateFontSize() {
        const elementDimension = this.refs.container.getBoundingClientRect();
        return Math.round(elementDimension.width * 0.6);
    }

    handleResize() {
        var fontSize = this.calculateFontSize();
        this.setState({labelFontSize: fontSize});
    }

    componentDidMount() {
        this.resizeHandler = window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    render() {
        const size = 100;
        const center = size / 2, radius = size / 2;
        const radians = (2 * Math.PI) * (1.0 * this.state.value * 30 / 360);
        const angle = 3 * Math.PI / 2 - radians;
        const style = {
            top: (center + Math.round(Math.sin(angle) * radius) * 0.82 - 10) + '%',
            left: (center + Math.round(Math.cos(angle) * radius) * 0.82 - 10) + '%',
            fontSize: this.state.labelFontSize
        };
        return (<div className='minute-digit' style={style}>
            <div className='minute-digit-value'>
                <div ref='container'>
                    <span>{this.state.value * 5}</span>
                </div>
            </div>
        </div>);
    }
}

MinuteDigit.propTypes = {
    value: React.PropTypes.number,
};

export default MinuteDigit;