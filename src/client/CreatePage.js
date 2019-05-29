import React, { Fragment } from 'react';
import {css, StyleSheet} from 'aphrodite';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';

import PostQuestionModal from './PostQuestionModal';

const styles = StyleSheet.create({
    addIcon: {
        fontSize: 34,
        fontWeight: 'bolder'
    },
});

export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            postQuestionModalOpen: false
        }
    };

    openNewQuestionModal=()=>{
        this.setState({
            postQuestionModalOpen: true
        })
    }

    closeModal=()=>{
        this.setState({
            postQuestionModalOpen: false
        })
    }

    render(){
        return(
            <>
                <Typography>
                    Scheduled Questions
                </Typography>
                <Tooltip
                        title='New Experiment'
                        placement='top'
                        TransitionComponent={Zoom}
                    >
                        <Button
                            //ariant='fab'
                            //className={css(styles.secondButton)}
                            onClick={this.openNewQuestionModal}
                            // component={Link}
                            // to={'/create'}
                        >
                            <AddIcon
                                className={css(styles.addIcon)}
                            />
                        </Button>
                </Tooltip>
                <PostQuestionModal
                    open={this.state.postQuestionModalOpen}
                    handleClose={this.closeModal}
                />
            </>
        );
    };
}
