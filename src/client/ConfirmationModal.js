// import React, { Fragment } from 'react';
// import {css, StyleSheet} from 'aphrodite';
// import socketIOClient from 'socket.io-client';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button'
// import Slide from '@material-ui/core/Slide';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DateFnsUtils from '@date-io/date-fns';
// import axios from 'axios';
// import Timer from './Timer';

// const Transition = (props) => {
//     return <Slide direction="down" {...props} />
// }

// const styles = StyleSheet.create({
//     question: {
//         // display: "flex",
//         // justifyContent: "center",
//         color:"white",
//         fontSize: 24,
//         '@media (min-width: 400px)': {
//             fontSize: 48
//         }
//     }
// });

// export default class ConfirmationModal extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             question: "",
//             optionA: "",
//             optionB: "",
//             date: "Wed May 22 2019 23:41:00 GMT-0700 (Pacific Daylight Time)",
//             startTime: "Sat May 25 2019 9:00:00 GMT-0700 (Pacific Daylight Time)",
//             endTime: "Sat May 25 2019 17:00:00 GMT-0700 (Pacific Daylight Time)"
//         }
//     };
//     handleDateChange = (date) => {
//         this.setState({
//             date: date
//         });
//     }

//     handleStartTimeChange = (time) => {
//         this.setState({
//             startTime: time
//         });
//     }

//     handleStartTimeChange = (time) => {
//         this.setState({
//             endTime: time
//         });
//     }

//     handleChange = (name, value) => {
//         this.setState({
//             [name]: value
//         })
//     }

//     handlePostQuestion = () => {

//     }
    
//     render(){
//         console.log("time: ", this.state.startTime);
//         return(
//             <Dialog
//                 open={this.props.open}
//                 onClose={this.props.handleClose}
//                 TransitionComponent={Transition}
//                 aria-labelledby="form-dialog-title"
//             >
//                 <DialogTitle id="form-dialog-title">
//                 Are You Sure?
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Your vote will be casted in 
//                     </DialogContentText>
//                     <Timer
//                         duration={10}
//                         autoStart
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         //onClick={this.props.handleClose}
//                     >
//                         Yes
//                     </Button>
//                     <Button>
//                         No
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         );
//     };
// }






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
import Timer from './Timer';

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

export default class ConfirmationModal extends React.Component {
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

    // handlePostQuestion = () => {

    // }
    
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
                Thanks for voting!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your vote is now casted.
                    </DialogContentText>
                    {/* <Timer
                        duration={10}
                        autoStart
                    /> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button
                        //onClick={this.props.handleClose}
                    >
                        Yes
                    </Button>
                    <Button>
                        No
                    </Button> */}
                </DialogActions>
            </Dialog>
        );
    };
}