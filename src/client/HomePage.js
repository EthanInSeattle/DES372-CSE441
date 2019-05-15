import React, { Fragment } from 'react';
import {css, StyleSheet} from 'aphrodite';
import socketIOClient from 'socket.io-client'
import Typography from '@material-ui/core/Typography';

const styles = StyleSheet.create({
    card: {
        marginTop: 48,
        marginLeft: 96,
        marginRight: 96,
        marginBottom: 48,
        padding: 20,
    },
    caption: {
        marginLeft: 10,
    },
    body: {
        marginTop: 10,
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "localhost:8000",
            sideA: 10,
            sideB: 10
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
    _renderVotes=()=>{
        let results = [];
        for (let i = 0; i < this.state.sideA; i++) {
            results.push(<div> A +1 </div>);
            results.push(<img src="assets/gun.png"/>);
        }
        for (let i = 0; i < this.state.sideB; i++) {
            results.push(<div> B +1 </div>);
        }
        return results;
    }

    render() {
        const{classes} = this.props;
        console.log("sideA  ", this.state.sideA);
        return(
            <Fragment>
                <button onClick={() => this.vote("A") }>Vote A</button>
                <Typography variant="h2">
                    Is Water Wet?
                </Typography>
                {this._renderVotes()}
            </Fragment>
        );
    }
};

export default HomePage;