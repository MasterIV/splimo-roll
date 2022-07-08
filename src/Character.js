
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
    Tabs,
    Tab,
    Grid,
    Modal,
} from '@mui/material';

import Skills from './Skills';
import DiceArea from './DiceArea';
import { rollDice, rerollDice } from './Dice';
import Spells from './Spells';
import DiceSlider from './DiceSlider';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const TabPanel = ({ value, index, children }) => value == index && children;

export default class CharacterSheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
            message: null,
            skills: JSON.parse(localStorage.getItem('skills') || "{}"),
            spells: JSON.parse(localStorage.getItem('spells') || "{}"),
            xp: JSON.parse(localStorage.getItem('xp') || "{}"),
            pool: 0,
            result: [],
            log: [],
        };
    }

    change(stat, value) {
        localStorage.setItem(stat, JSON.stringify(value));
        this.setState({[stat]: value});
    }

    roll(selection) {
      const result = rollDice(selection)
      this.setState({result, pool: 0});
    }

    reRoll(picked) {
      const result = rerollDice(this.state.result, picked);
      this.setState({result});
    }

    requestRoll(pool, skill) {
        this.setState({pool, skill});
    }

    render() {
        const { result, message, skills, skill, spells, pool } = this.state;

        return <ThemeProvider theme={darkTheme}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <DiceArea
                        result={result}
                        message={message}
                        onRoll={this.roll.bind(this)}
                        onReroll={this.reRoll.bind(this)} />
                </Grid>

                <Grid item xs={7} sx={{overflowY: 'scroll', height: '100vh', paddingRight: 2}}>
                    <Tabs value={this.state.tab} onChange={(evt, tab) => this.setState({ tab })}>
                        <Tab label="Skills" />
                        <Tab label="Spells" />
                        <Tab label="Combat" />
                        <Tab label="Xp" />
                        <Tab label="Log" />
                    </Tabs>

                    <TabPanel value={this.state.tab} index={0}>
                        <Skills
                            skills={skills}
                            onChange={value => this.change('skills', value)}
                            onRoll={this.requestRoll.bind(this)} />
                    </TabPanel>

                    <TabPanel value={this.state.tab} index={1}>
                        <Spells
                            skills={skills}
                            spells={spells}
                            onChange={value => this.change('spells', value)}
                            onRoll={this.requestRoll.bind(this)}/>
                    </TabPanel>

                    <TabPanel value={this.state.tab} index={2}>Combat</TabPanel>
                    <TabPanel value={this.state.tab} index={3}>XP</TabPanel>
                    <TabPanel value={this.state.tab} index={4}>Log</TabPanel>
                </Grid>
            </Grid>

            <DiceSlider
                pool={pool}
                skill={skill}
                onCancel={() => this.setState({pool: 0}) }
                onRoll={this.roll.bind(this)} />
        </ThemeProvider>;
    }
}
