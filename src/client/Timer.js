import React, { Fragment } from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            started: false,
            secondsRemaining: this.props.duration
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    // secondsToTime(secs){
    //     let hours = Math.floor(secs / (60 * 60));
    
    //     let divisor_for_minutes = secs % (60 * 60);
    //     let minutes = Math.floor(divisor_for_minutes / 60);
    
    //     let divisor_for_seconds = divisor_for_minutes % 60;
    //     let seconds = Math.ceil(divisor_for_seconds);
    
    //     let obj = {
    //       "h": hours,
    //       "m": minutes,
    //       "s": seconds
    //     };
    //     return obj;
    // }

    // componentDidMount() {
    //     let timeLeftVar = this.secondsToTime(this.state.seconds);
    //     this.setState({ time: timeLeftVar });
    // }

    startTimer() {
        if (this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        //   this.setState(prevState=>({
        //     secondsRemaining: prevState.secondsRemaining-1
        //   }));
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        // let seconds = this.state.seconds - 1;
        // this.setState({
        //   time: this.secondsToTime(seconds),
        //   seconds: seconds,
        // });
        
        // // Check if we're at zero.
        // if (seconds == 0) { 
        //   clearInterval(this.timer);
        // }
        if (this.state.secondsRemaining > 0) {
            this.setState(prevState=>({
                secondsRemaining: prevState.secondsRemaining-1
            }));
        } else {
            clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    _renderTime=()=>{
        if(this.state.secondsRemaining < 1) {
            if (this.props.callBack != null) {
                this.props.callBack();
            }
        }
        if (this.state.secondsRemaining <=60) {
            return `${this.state.secondsRemaining}s`
        }
        let hours = Math.floor(this.state.secondsRemaining/3600);
        let mins = Math.floor((this.state.secondsRemaining - hours*3600)/60);
        let seconds = Math.floor((this.state.secondsRemaining - hours*3600 - mins*60));
        return `${hours >= 10 ? hours : "0" + hours}:${mins >= 10 ? mins : "0" + mins}:${seconds >= 10 ? seconds : "0" + seconds} REMAINING`;
    }

    render() {
        //this.startTimer();
        if(this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
            this.setState({
                started: true
            })
        } else {
            if(this.state.secondsRemaining < 1) {
                clearInterval(this.timer);
            }
        }
        return (
            <div 
                style={{
                    color: this.props.color,
                    // fontFamily: "t26-carbon,monospace",
                    // fontStyle: "normal",
                    // fontSize: this.props.fontSize,
                    // textAlign: "center"
                }}
            >
                {this._renderTime()}
            </div>
        );
    }
}