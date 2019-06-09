import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import Typography from '@material-ui/core/Typography';

const styles = StyleSheet.create({
    // starterContainer: {
    //     textAlign: "center",
    //     position: "absolute",
    //     fontFamily: "t26-carbon,monospace",
    //     fontStyle: "italic",
    //     fontSize: 14,
    //     top: "10%",
    //     '@media (min-width: 400px)': {
    //         top: "30%",
    //         fontSize: 36
    //     },
    //     left: "50%",
    //     transform: "translate(-50%, -50%)",
    //     //color: 'black',
    // },
    answerContainer: {
        textAlign: "center",
        position: "absolute",
        top: "40%",
        '@font-face': {
            fontFamily: 'Favorite',
            src: "url('Favorit.otf') format('opentype')",
            fontStyle: "normal"
        },
        fontSize: 48,
        '@media (min-width: 400px)': {
            top: "40%",
            fontSize: 150
        },
        left: "50%",
        transform: "translate(-50%, -50%)",
        //color: 'black',
    }, voteNumberContainer: {
        textAlign: "center",
        position: "absolute",
        top: "80%",
        '@font-face': {
            fontFamily: 'Favorite',
            src: "url('Favorit.otf') format('opentype')",
            fontStyle: "normal"
        },
        fontSize: 14,
        whiteSpace: "nowrap",
        '@media (min-width: 400px)': {
            top: "80%",
            fontSize: 60
        },
        left: "50%",
        transform: "translate(-50%, -50%)",
    }
});

export default class ResultPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render(){
        let AWon = this.props.location.state.sideA > this.props.location.state.sideB ? true : false;
        return(
            <div
                style={{
                    color: "#ffffff",
                    backgroundColor: AWon ? "#3D67FC" : "#FF36D6",
                    height: "100vh"
                }}
            >
                {/* <div
                    className={css(styles.starterContainer)}
                >
                    the people have spoken...
                </div> */}

                <div
                    className={css(styles.answerContainer)}
                >
                    {AWon ? "WATER IS WET" : "WATER IS NOT WET"}
                </div>

                <div
                    className={css(styles.voteNumberContainer)}
                >
                    <div>{this.props.location.state.sideA} VOTES FOR WET</div>
                    <div>{this.props.location.state.sideB} VOTES FOR NOT WET</div>
                    {/* <Typography>
                        {this.props.location.state.sideA} VOTES FOR WET
                    </Typography>
                    <Typography>
                        {this.props.location.state.sideB} VOTES FOR NOT WET
                    </Typography> */}
                </div>
            </div>
        )
    }
}