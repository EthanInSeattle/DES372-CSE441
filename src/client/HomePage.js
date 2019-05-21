import React, { Fragment } from 'react';
import {css, StyleSheet} from 'aphrodite';
import socketIOClient from 'socket.io-client'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import RotatingBounceBall from './RotatingBounceBall';

const styles = StyleSheet.create({
    question: {
        display: "flex",
        justifyContent: "center",
        color:"white",
        marginTop: 100,
        marginBottom: 50
    },
    options: {
        display: "flex",
        justifyContent: "space-evenly",
        color:"white",
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
    tempText: {
        color:"white"
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            qid: 0,
            optionA: "",
            optionB: "",
            endpoint: "localhost:8000",
            sideA: 1,
            sideB: 1
        }
    }

    componentDidMount(){
        // call api to update vote number
        axios.get("http://localhost:8000/api/current")
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
        const socket = socketIOClient(this.state.endpoint);
        socket.on('vote', (side)=>{
            // this.setState((prevState)=>{

            //     return {sideA: prevState.sideA + 1}
            // })
            this.setState(prevState=>(
                {[side]: prevState[side] + 1}
            ))
        })
    }

    vote=(side)=>{
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('vote', side)
    }
    //
    _renderVotesA=()=>{
        let results = [];
        for (let i = 0; i < this.state.sideA; i++) {
            //results.push(<div className={css(styles.tempText)}> A +1 </div>);
            //results.push(<div><img className={css(styles.critterSymbol)} src="assets/A.png"/></div>);
            results.push(<RotatingBounceBall 
                            src="assets/A.png"
                            initialDirection="RIGHT"
                        />);
        }
        return results;
    }

    _renderVotesB=()=>{
        let results = [];
        for (let i = 0; i < this.state.sideB; i++) {
            //results.push(<div className={css(styles.tempText)}> B +1 </div>);
            //results.push(<div><img className={css(styles.critterSymbol)} src="assets/B.png"/></div>);
            results.push(<RotatingBounceBall 
                src="assets/B.png"
                initialDirection="LEFT"
            />);
        }
        return results;
    }
    render() {
        const{classes} = this.props;
        console.log("sideA  ", this.state.sideA);
        return(
            <Fragment>
                {/* <button onClick={() => this.vote("A") }>Vote A</button> */}
                <Typography className={css(styles.question)} variant="h1">
                    {this.state.question}
                </Typography>
                <div className={css(styles.options)}>
                    <div className={css(styles.optionBackground)}>
                        <Typography className={css(styles.tempText)} variant="h5">
                            {this.state.optionA}
                        </Typography>
                    </div>
                    <Typography className={css(styles.tempText)} variant="h5">
                        {this.state.optionB}
                    </Typography>
                </div>
                <div className={css(styles.voteContainer)}>
                    <div> 
                        {this._renderVotesA()}
                    </div>
                    <div> 
                        {this._renderVotesB()}
                    </div>
                </div>
            </Fragment>
        );
    }
};

export default HomePage;