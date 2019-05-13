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

    //
    _renderVotes=()=>{
        let results = [];
        for (let i = 0; i < this.state.sideA; i++) {
            results.push(<div> A +1 </div>);
        }
        return results;
    }

    render() {
        const{classes} = this.props;
        const socket = socketIOClient(this.state.endpoint);
        return(
            <Fragment>
                <Typography variant="h2">
                    Is Water Wet?
                </Typography>
                {this._renderVotes()}
            </Fragment>
        );
    }
};

export default HomePage;