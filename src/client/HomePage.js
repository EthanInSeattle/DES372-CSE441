import React, { Fragment } from 'react';
import {css, StyleSheet} from 'aphrodite';
import socketIOClient from 'socket.io-client'
import Typography from '@material-ui/core/Typography';

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
            endpoint: "localhost:8000",
            sideA: 0,
            sideB: 0
        }
    }

    componentDidMount(){
        // call api to update vote number
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
            results.push(<div><img className={css(styles.critterSymbol)} src="assets/A.png"/></div>);
        }
        return results;
    }

    _renderVotesB=()=>{
        let results = [];
        for (let i = 0; i < this.state.sideB; i++) {
            //results.push(<div className={css(styles.tempText)}> B +1 </div>);
            results.push(<div><img className={css(styles.critterSymbol)} src="assets/B.png"/></div>);
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
                    Is  Water  Wet?
                </Typography>
                <div className={css(styles.options)}>
                    <Typography className={css(styles.tempText)} variant="h5">
                        Yes
                    </Typography>
                    <Typography className={css(styles.tempText)} variant="h5">
                        No
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