import { Grid, Modal, Paper, Slide, Slider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Btn } from './common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: 10
  };

export default class DiceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slider: 0,
        };
    }

    close() {
        this.setState({ slider: 0 });
        this.props.onCancel();
    }

    roll() {
        const {slider} = this.state;
        const {pool, skill, onRoll} = this.props;

        this.setState({ slider: 0 });
        onRoll(slider > 0 ? {
            reckless: slider,
            standard: pool-slider
        } : {
            insight: -slider,
            standard: pool+slider
        }, skill);
    }

    render() {
        const {slider} = this.state;
        const {pool, skill} = this.props;

        return <Modal open={pool} onClose={this.close.bind(this)}>
            <Paper sx={style}>
                <Stack spacing={6}>
                    <Typography variant="h6" component="h2" align='center'>
                        Select pool for <strong style={{color: '#90caf9'}}>{skill}</strong> check
                    </Typography>

                    <Slider onChange={(e, slider) => this.setState({slider})} value={slider} step={1} min={-pool} max={pool} marks={[
                        {value: 0, label: 'Neutral'},
                        {value: -pool, label: 'Insight'},
                        {value: pool, label: 'Reckless'}
                    ]}/>

                    <Btn onClick={this.roll.bind(this)}>{slider > 0
                            ? `Roll ${slider} reckless and ${pool-slider} standard dice.`
                            : `Roll ${-slider} insight and ${pool+slider} standard dice.`}</Btn>
                </Stack>
            </Paper>
        </Modal>;
    }
}
