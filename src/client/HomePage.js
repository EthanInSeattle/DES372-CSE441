import React, { Fragment } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {css, StyleSheet} from 'aphrodite';
import socketIOClient from 'socket.io-client'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';

//import Favorit from '../../dist/assets/Favorit-Regular.otf';
import RotatingBounceBall from './RotatingBounceBall';
import ConfirmationModal from './ConfirmationModal';
import Timer from './Timer';
import ThanksModal from './ThanksModal';

const styles = StyleSheet.create({
    outterContainer: {
        backgroundColor: "#FFFFFF",
        height: "100vh"
    },
    question: {
        textAlign: "center",
        color:"black",
        // fontFamily: "t26-carbon,monospace",
        // fontStyle: "normal",
        '@font-face': {
            fontFamily: 'Favorite',
            src: "url('Favorit.otf') format('opentype')",
            fontStyle: "normal"
        },
        fontSize: 48,
        '@media (min-width: 400px)': {
            fontSize: 160
        },
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    optionContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        color:"black",
        marginBottom: 50
    },
    optionBackground: {
        backgroundImage: `url("assets/A.png")`
    },
    voteContainer: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    critterSymbol: {
        width: 60,
        height: 60
    },
    options: { 
        color:"black",
        fontSize: 18,
        '@media (min-width: 400px)': {
            fontSize: 36
        }
    },
    timer: {
        position: "absolute",
        bottom: "1%",
        right: "2%",
        fontFamily: "t26-carbon,monospace",
        fontStyle: "normal",
        fontSize: 12,
        '@media (min-width: 400px)': {
            fontSize: 24
        },
    },
    optionCritter: {
        display: "flex",
        justifyContent: "space-evenly"
    }, 
    entry: {
        backgroundColor: "white"
    }
});

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            qid: 0,
            optionA: "", 
            optionB: "",
            endpoint: "localhost:8000",
            sideA: 0,
            sideB: 0,
            modalOpen: false,
            critterSize: screen.width > 400 ? 60: 30,
            result: "green",
            ended: false,
            thankModalOpen: false,
            entry: false
        }
    }

    componentDidMount(){
        // call api to update vote number
        console.log("domain", window.location.hostname);
        let domain = window.location.hostname == "localhost" ? "localhost:8081" : window.location.hostname
        axios.get(`http://${domain}/api/current`)
        .then(data=>{
            console.log("data", data.data);
            this.setState({
                question: data.data.question,
                qid: data.data.qid,
                optionA: data.data.optiona,
                optionB: data.data.optionb,
                sideA: data.data.amounta,
                sideB: data.data.amountb
            })
        })
        .catch(err=>{
            console.log("error: ", err);
        });
        const socket = socketIOClient(window.location.hostname == "localhost" ? "http://localhost:8081" : "http://" + window.location.hostname);
        socket.on('vote', (side)=>{
            let question = this.state.question;
            let wet = "+1 FOR WET";
            let notWet = "+1  FOR NOT WET";
            this.setState(prevState=>({
                [side]: prevState[side] + 1,
                thankModalOpen: true,
                question: side == "sideA" ? wet : notWet
            }));
            setTimeout(function () {
                this.setState({
                    thanksModalOpen: false,
                    question: question
                });
            }.bind(this), 3000);
        });
        // socket.on('confirm', ()=>{
        //     this.setState({
        //         modalOpen: true
        //     });
        // });
        // socket.on('cancel', ()=>{
        //     this.setState({
        //         modalOpen: false
        //     });
        // })
    }

    vote=(side)=>{
        const socket = socketIOClient(window.location.hostname == "localhost" ? "http://localhost:8081" : "http://" + window.location.hostname);
        socket.emit('vote', side)
    }
    //

    getRandomInt=(min, max)=>{
        return Math.random() * (max - min) + min;
    }

    addSideA=(index, critterSize, results)=>{
        let xStart = this.getRandomInt(0, window.innerWidth)
        let xEnd = window.innerWidth - xStart
        let yStart = -1 * (index+1) * critterSize;
        let yEnd =  window.innerHeight + yStart - critterSize*2;
        results.push(<RotatingBounceBall
                        key={index+1}
                        src={"/assets/A.png"}
                        size={critterSize}
                        xStart={xStart}
                        xEnd={xEnd}
                        yStart={yStart}
                        yEnd={yEnd}
                    />);
    }

    addSideB=(index, critterSize, results)=>{
        let xStart = this.getRandomInt(0, window.innerWidth);
        let xEnd = window.innerWidth - xStart;
        let yStart = -1 * (index + 1 + this.state.sideA) * critterSize;
        let yEnd =  window.innerHeight + yStart - critterSize * 2;
        results.push(<RotatingBounceBall 
            key={-1*(index+1)}
            src={"/assets/B.png"}
            size={critterSize}
            xStart={xStart}
            xEnd={xEnd}
            yStart={yStart}
            yEnd={yEnd}
        />);
    }

    _renderVotes=()=>{
        let results = [];
        let critterSize = (this.state.sideA+this.state.sideB) < 100 ? 60 : 30;
        if(window.innerWidth <= 400) {
            critterSize = 30;
        }
        let remainingA = this.state.sideA;
        let remainingB = this.state.sideB;
        while (remainingA != 0 || remainingB != 0) {
            if (remainingA == 0) {
                this.addSideB(this.state.sideB - remainingB, critterSize, results);
                remainingB --;
                console.log("added B");
            } else if (remainingB == 0) {
                this.addSideA(this.state.sideA - remainingA, critterSize, results);
                remainingA --;
                console.log("added A");
            } else {
                if (Math.random() < 0.5) {
                    this.addSideA(this.state.sideA - remainingA, critterSize, results);
                    remainingA --;
                    console.log("added A");
                } else {
                    this.addSideB(this.state.sideB - remainingB, critterSize, results);
                    remainingB --;
                    console.log("added B");
                }
            }
        }
        return results;
    }

    renderResult=(side)=>{
        this.setState({
            ended: true,
            result: this.state.sideA >= this.state.sideB ? "green" : "red"
        })
    }

    getRemainingSeconds = () =>{
        let today = new Date();
        let currentHours = today.getHours();
        let currentMins = today.getMinutes();
        let currentSeconds = today.getSeconds();

        let finalHour = 16;
        let finalMinutes = 0;
        let finalSeconds = 0;

        let hours = finalHour - currentHours;
        if(currentMins > finalMinutes) {
            hours --;
        }
        let mins = finalMinutes - currentMins;
        if(currentMins > finalMinutes) {
            mins = 60 + finalMinutes - currentMins;
        }
        if(currentSeconds > finalSeconds) {
            mins --;
        }
        let seconds = 60 - finalSeconds - currentSeconds;
        return hours*60*60 + mins*60 + seconds;
    }


    renderThisPage = () => {
        return(
            <div className={css(styles.outterContainer)}>
                    {this._renderVotes()}
                    <Typography className={css(styles.question)}>
                        {this.state.question.toLowerCase()}
                    </Typography>
                    <div className={css(styles.timer)}>
                        <Timer
                            color="#000000"
                            // font={}
                            //fontSize={window.innerWidth > 400 ? 24 : 12}
                            // duration={60*60*9}
                            duration={this.getRemainingSeconds()}
                            autoStart
                            callBack={this.renderResult}
                        />
                        UNTILL POLL CLOSES
                    </div>
            </div>
        );
    }
    redirectToResult = () => {
        return(
            <Redirect 
                to={{
                    pathname: `/result`,
                    state: {
                        sideA: this.state.sideA,
                        sideB: this.state.sideB
                    }
            }}/>
        );
    }
    render() {
        const{classes} = this.props;
        console.log("sideA  ", this.state.sideA);
        return(
            <>
            {!this.state.ended && this.renderThisPage()}
            {this.state.ended && this.state.question != "" && this.redirectToResult()}
            </>
        );
    }
};