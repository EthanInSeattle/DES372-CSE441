import React, { Component } from "react";
import TimelineMax from "gsap/TimelineMax";
import TweenMax from "gsap/TweenMax";

export default class RotatingBounceBall extends Component {

	constructor(props){
		super(props);
		this.container = null;
        this.tween = null;
        this.state = {
            entry: true
        }
	}

    getRandomInt=(min, max)=>{
        return Math.random() * (max - min) + min;
    }

    move=()=>{
        let from ={
            x: this.props.xStart, 
            y: this.props.yStart
        };
        let to={
            x: this.props.xEnd, 
            y: this.props.yEnd, 
            ease: Linear.easeNone,
            rotation: 360,
            transformOrigin: "center"
        };
        let duration = this.getRandomInt(13, 20);
        this.tween.add(TweenMax.fromTo(this.container, duration, from, to))
        this.tween.restart();
        //this.tween.yoyo(true);
    }
	componentDidMount(){
        // let duration = this.getRandomInt(13, 20);
        // this.tween = new TimelineMax({repeat: -1, yoyo: true});
        // this.tween.add(TweenMax.fromTo(this.container, duration, from, to));

        // this.tween = new TimelineMax();
        // this.tween.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration);
        // this.tween.add(TweenMax.fromTo(this.container, duration, from, to, {yoyo:true}));
        // this.tween.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration);

        // this.tween = new TimelineMax();
        // this.tween.to(this.container, 5, {x: 360, y: 360}, '-='+duration);
        if(this.state.entry) {
            let transformFrom = {
                x: this.props.xStart,
                //y: this.props.yEnd, 
                y: 0,
                scale: 100
            }

            let transformTo = {
                x: this.props.xStart, 
                //y: this.props.yStart, 
                y: 0,
                scale: 1
            }
            this.tween = new TimelineMax();
            this.tween.add(TweenMax.fromTo(this.container, 3, transformFrom, transformTo,0));
            setTimeout(function () {
                this.setState({
                    entry: false
                });
                let from ={
                    x: this.props.xStart, 
                    // y: this.props.yStart
                    //x: 0,
                    y: 0
                };
                let to={
                    x: this.props.xEnd, 
                    //y: this.props.yEnd, 
                    y: window.innerHeight - this.props.size,
                    ease: Linear.easeNone,
                    rotation: 360,
                    transformOrigin: "center"
                };
                let duration = this.getRandomInt(13, 20);
                // this.tween.add(TweenMax.fromTo(this.container, duration, from, to))
                // this.tween.restart();
                this.tween = new TimelineMax({repeat: -1, yoyo: true});
                this.tween.add(TweenMax.fromTo(this.container, duration, from, to))
                //this.tween.yoyo(true);
            }.bind(this), 3000);
        } else {
            let from ={
                x:this.props.xStart, 
                y:this.props.yStart
            };
            let to={
                x:this.props.xEnd, 
                y:this.props.yEnd, 
                ease: Linear.easeNone,
                rotation: 360,
                transformOrigin: "center"
            };
            this.tween = new TimelineMax({repeat: -1, yoyo: true});
            this.tween.add(TweenMax.fromTo(this.container, duration, from, to))
        }
        // this.tween = new TimelineMax({onComplete:this.move});
        // this.tween.add(TweenMax.fromTo(this.container, 3, {scale: 2}, {scale: 1},0));
        // this.tween.add(TweenMax.fromTo(this.container, duration, from, to))
        // this.tween.yoyo(true);
        //this.tween.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration);
	}
	render(){
		return <div className="container">
            <img
                src={this.props.src}
                alt="critter"
                style={{
                    height: this.props.size,
                    //width: this.props.size
                    position: 'absolute',
                    top: "0%"
                }}
                ref={ img => this.container = img }
            />
		</div>;
	}
	
}
