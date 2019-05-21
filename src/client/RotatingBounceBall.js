import React, { Component } from "react";
import { TimelineLite, CSSPlugin, TimelineMax } from "gsap/all";
import {css, StyleSheet} from 'aphrodite';

const styles = StyleSheet.create({
    critterSymbol: {
        '@media (min-width: 400px)': {
            width: 60,
            height: 60
        },
        width: 30,
        height: 30
    },
})

class SimpleTween extends Component {

	constructor(props){
		super(props);
		// logo container
		this.logoContainer = null;
		// logo tween
        this.logoTween = null;
        this.state = {
            width: 0,
            height: 0,
        }
	}


	componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // create logo tween
        let direction = this.props.initialDirection == "RIGHT" ? 500 : -500;
		// this.logoTween = new TimelineLite({onComplete:function() {
        //     // direction = -1*direction;
        //     // this.restart();
        //     //logoTween.reverse();
        //     this.reverse();
        //     this.restart();
        // }})
        this.logoTween = new TimelineMax({repeat: -1, yoyo: true})
			//.to(this.logoContainer, 2, { x: 500 })
            .to(this.logoContainer, 5, { rotation: 360, ease: Linear.easeNone, transformOrigin: "center" })
            .to(this.logoContainer, 5, { x: direction, y: 150, ease: Linear.easeNone }, '-=5');
	}

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

	render(){
		return <div className="container">
            <img
                src={this.props.src}
                alt=""
                className={css(styles.critterSymbol)}
                ref={ img => this.logoContainer = img }
            />
		</div>;
	}
	
}

export default SimpleTween;
