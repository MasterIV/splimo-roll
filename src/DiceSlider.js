import { Grid, Modal, Paper, Slide, Slider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Btn, Pool } from './common';

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
            mod: 0,
            slider: 0,
        };
    }

    close() {
        this.setState({ mod: 0, slider: 0 });
        this.props.onCancel();
    }

    roll() {
        const {slider, mod} = this.state;
        const {pool, skill, onRoll} = this.props;
        const base = pool + mod;

        this.setState({ mod: 0, slider: 0 });
        onRoll(slider > 0 ? {
            reckless: slider,
            standard: base-slider
        } : {
            insight: -slider,
            standard: base+slider
        }, skill);
    }

    render() {
        const {slider, mod} = this.state;
        const {pool, skill} = this.props;
        const base = pool + mod;

        return <Modal open={pool} onClose={this.close.bind(this)}>
            <Paper sx={style}>
                <Stack spacing={6}>
                    <Typography variant="h6" component="h2" align='center'>
                        Select pool for <strong style={{color: '#90caf9'}}>{skill}</strong> check
                    </Typography>

                    <Pool
                        name="mod"
                        value={mod}
                        onChange={(k,v) => this.setState({[k]: Math.max(v, 1-pool)})}
                        label="Modifier"
                        width={300} />

                    <Slider onChange={(e, slider) => this.setState({slider})} value={slider} step={1} min={-base} max={base} marks={[
                        {value: 0, label: 'Neutral'},
                        {value: -base, label: 'Insight'},
                        {value: base, label: 'Reckless'}
                    ]}/>

                    <Btn onClick={this.roll.bind(this)}>{slider > 0
                            ? `Roll ${slider} reckless and ${base-slider} standard dice.`
                            : `Roll ${-slider} insight and ${base+slider} standard dice.`
                    }</Btn>
                </Stack>
            </Paper>
        </Modal>;
    }
}
