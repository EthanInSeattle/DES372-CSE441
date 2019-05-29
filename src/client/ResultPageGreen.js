import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import Typography from '@material-ui/core/Typography';

const styles = StyleSheet.create({
    starterContainer: {
        textAlign: "center",
        position: "absolute",
        fontFamily: "t26-carbon,monospace",
        fontStyle: "italic",
        fontSize: 14,
        top: "10%",
        '@media (min-width: 400px)': {
            top: "30%",
            fontSize: 36
        },
        left: "50%",
        transform: "translate(-50%, -50%)",
        //color: 'black',
    },
    answerContainer: {
        textAlign: "center",
        position: "absolute",
        top: "50%",
        fontFamily: "t26-carbon,monospace",
        fontStyle: "normal",
        fontSize: 36,
        '@media (min-width: 400px)': {
            top: "50%",
            fontSize: 72
        },
        left: "50%",
        transform: "translate(-50%, -50%)",
        //color: 'black',
    }
});

export default class ResultPageGreen extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div
                style={{
                    color: "#ffffff",
                    backgroundColor: "#27AE60",
                    height: "100vh"
                }}
            >
                <div
                    className={css(styles.starterContainer)}
                >
                    the pople have spoken...
                </div>

                <div
                    className={css(styles.answerContainer)}
                >
                    water is wet.
                </div>
            </div>
        )
    }
}