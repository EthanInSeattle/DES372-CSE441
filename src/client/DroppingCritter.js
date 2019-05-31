import React, { Component } from "react";
import TimelineMax from "gsap/TimelineMax";
import TweenMax from "gsap/TweenMax";

export default class DroppingCritter extends Component {

	constructor(props){
		super(props);
		this.container = null;
        this.tween = null;
	}

    getRandomInt=(min, max)=>{
        return Math.random() * (max - min) + min;
    }

	componentDidMount(){
        let from ={
            //x:(window.innerWidth - this.props.size)/2, 
            //x: window.innerWidth/4,
            x: this.props.x,
            y:0
        };
        let to={
            x: this.props.x,
            y: this.props.y, 
            //ease: Linear.easeNone
        };
        let duration = 3
        this.tween = new TimelineMax();
        this.tween.add(TweenMax.fromTo(this.container, duration, from, to));
        //this.tween.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration);
        //this.tween.add(TweenMax.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration));
            //.fromTo(this.container, duration, {x:this.props.xStart, y:this.props.yStart}, {x:this.props.xEnd, y:this.props.yEnd,ease: Linear.easeNone})
            //.fromTo(this.container, duration, from, to)
            //.to(this.container, duration, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center" }, '-='+duration)
            //.to(this.container, duration, to, '-='+duration);
            //.fromTo(this.container, duration, from, to, '-=7');
	}
	render(){
		return <div className="container">
            <img
                src={this.props.src}
                alt="critter"
                style={{
                    height: this.props.size,
                    width: this.props.size
                }}
                ref={ img => this.container = img }
            />
		</div>;
	}
	
}
