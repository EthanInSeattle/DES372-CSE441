import React, { Fragment } from 'react';
import {css, StyleSheet} from 'aphrodite';
import socketIOClient from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import {
        MuiPickersUtilsProvider,
        KeyboardTimePicker,
        KeyboardDatePicker,
    } from '@material-ui/pickers';

const Transition = (props) => {
    return <Slide direction="down" {...props} />
}

const styles = StyleSheet.create({
    question: {
        // display: "flex",
        // justifyContent: "center",
        color:"white",
        fontSize: 24,
        '@media (min-width: 400px)': {
            fontSize: 48
        }
    }
});

export default class PostQuestionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            optionA: "",
            optionB: "",
            date: "Wed May 22 2019 23:41:00 GMT-0700 (Pacific Daylight Time)",
            startTime: "Sat May 25 2019 9:00:00 GMT-0700 (Pacific Daylight Time)",
            endTime: "Sat May 25 2019 17:00:00 GMT-0700 (Pacific Daylight Time)"
        }
    };
    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    }

    handleStartTimeChange = (time) => {
        this.setState({
            startTime: time
        });
    }

    handleStartTimeChange = (time) => {
        this.setState({
            endTime: time
        });
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handlePostQuestion = () => {

    }
    
    render(){
        console.log("time: ", this.state.startTime);
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                TransitionComponent={Transition}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                Post A New Question
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please specify question details in following fields.
                    </DialogContentText>
                    <TextField
                        id="standard-name"
                        label="Question"
                        //className={classes.textField}
                        value={this.state.question}
                        onChange={event=>this.handleChange('question', event.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <br/>
                    <TextField
                        id="standard-name"
                        label="Option A"
                        //className={classes.textField}
                        value={this.state.optionA}
                        onChange={event=>this.handleChange('optionA', event.target.value)}
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                    />
                    <br/>
                    <TextField
                        id="standard-name"
                        label="Option B"
                        //className={classes.textField}
                        value={this.state.optionB}
                        onChange={event=>this.handleChange('optionB', event.target.value)}
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                    />
                    <br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        label="Polling Date"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        
                    />
                    <br/>
                    {/* <KeyboardTimePicker
                        margin="normal"
                        label="Start Time"
                        value={this.state.startTime}
                        onChange={this.handleStartTimeChange}
                    />
                    <br/>
                    <KeyboardTimePicker
                        margin="normal"
                        label="End Time"
                        value={this.state.endTime}
                        //onChange={this.handleEndTimeChange}
                        onChange={event=>this.handleChange("endTime", event.target.value)}
                    /> */}
                    </MuiPickersUtilsProvider>
                    <br/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.props.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}