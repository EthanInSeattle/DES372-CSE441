import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";
import {css, StyleSheet} from 'aphrodite';

const styles = StyleSheet.create({
    critterSymbol: {
        width: 60,
        height: 60
    },
})

class SimpleTween extends Component {

	constructor(props){
		super(props);
		// logo container
		this.logoContainer = null;
		// logo tween
		this.logoTween = null;
	}


	componentDidMount(){
		// create logo tween
		this.logoTween = new TimelineLite({onComplete:function() {
            this.restart();
        }})
			//.to(this.logoContainer, 2, { x: 500 })
            .to(this.logoContainer,5, { rotation: 360, ease: Linear.easeNone, transformOrigin: "center" })
            .to(this.logoContainer, 5, { x: -500, ease: Linear.easeNone }, '-=5');
	}


	render(){
		return <div className="container">
            <img
                src="assets/B.png"
                alt=""
                className={css(styles.critterSymbol)}
                ref={ img => this.logoContainer = img }
            />
		</div>;
	}
	
}

export default SimpleTween;
