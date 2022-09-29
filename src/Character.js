import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {Grid, Tab, Tabs,} from '@mui/material';

import Skills from './Skills';
import DiceArea from './DiceArea';
import {rerollDice, rollDice} from './Dice';
import Spells from './Spells';
import DiceSlider from './DiceSlider';
import {connection} from './Connect';
import Account from './Account';
import {Btn} from './common';
import Summary from './Summary';
import Result from './Result';
import XpSummary from './XpSummary';
import axios from "axios";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const TabPanel = ({ value, index, children }) => value == index && children;

const Roll = ({message, result}) => {
    return <div className='log'>
        <Summary result={result} />
        <Result result={result} message={message} />
    </div>;
};

const connecting = 'Connecting...';
let rollId = 1;

export default class CharacterSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            message: null,
            status: connecting,
            account: JSON.parse(localStorage.getItem('account') || "null"),
            skills: JSON.parse(localStorage.getItem('skills')),
            spells: JSON.parse(localStorage.getItem('spells')),
            xp: JSON.parse(localStorage.getItem('xp') || "{}"),
            pool: 0,
            result: [],
            log: [],
        };

        const {account} = this.state;
        this.loadCharacter(account);

        this.change = this.change.bind(this);
        this.roll = this.roll.bind(this);
        this.reRoll = this.reRoll.bind(this);
        this.requestRoll = this.requestRoll.bind(this);
        this.showRoll = this.showRoll.bind(this);
    }

    loadCharacter(account) {
        if (account !== null) {
            const params = new URLSearchParams();
            params.append('method', 'load');
            params.append('playerName', account.name);
            params.append('characterName', account.player);
            axios.post('https://splimo.walth-web.de/', params).then((response) => {
                if (response.data !== null) {
                    const character = JSON.parse(response.data.data);
                    if (character.skills !== null) {
                        this.state.skills = character.skills;
                    }
                    if (character.spells !== null) {
                        this.state.spells = character.spells;
                    }
                }
            });
        }
    }

    change(stat, value, callback) {
        localStorage.setItem(stat, JSON.stringify(value));
        this.setState({[stat]: value}, callback);
    }

    save() {
        const {account} = this.state;
        const {skills} = this.state;
        const {spells} = this.state;
        if (account !== null) {
            const character = {'account': account, 'skills': skills, 'spells': spells};
            const params = new URLSearchParams();
            params.append('method', 'save');
            params.append('playerName', account.name);
            params.append('characterName', account.player);
            params.append('character', JSON.stringify(character));
            axios.post('https://splimo.walth-web.de/', params).then(() => {

            }).catch(error => console.log(error));
        }
    }

    roll(selection, skill) {
        const result = rollDice(selection)
        this.setState({pool: 0});
        connection.emit('roll', result, skill);
    }

    reRoll(picked) {
        const result = rerollDice(this.state.result, picked);
        connection.emit('reroll', result);
    }

    requestRoll(pool, skill) {
        this.setState({pool, skill});
    }

    showRoll(message, result, name, skill) {
        const log = [{id: rollId++, message, result}, ...this.state.log];
        const xpCount = result
            .map(r => (r.side && r.side.result == 'xp') | 0)
            .reduce((a,b) => a+b);

        if(skill && xpCount) {
            const xp = {...this.state.xp};

            if(!xp[skill]) xp[skill] = {};
            xp[skill][name] = (xp[skill][name] | 0) + xpCount;
            this.change('xp', xp);
        } else if(xpCount) {
            message = <div style={{color: '#B77'}}>XP not recorded - {message}</div>;
        }

        this.setState({message, result, log});
    }

    componentDidMount() {
        const { account } = this.state;

        if(account) {
            connection.name = `${account.name} (${account.player})`;
            connection.join(status => this.setState({status}), this.showRoll, account.room);
        }
    }

    render() {
        const {
            result, message, skills,
            skill, spells, pool,
            account, status, log, xp
        } = this.state;

        if(!account)
            return <ThemeProvider theme={darkTheme}>
                <Account onCreate={account => this.change('account', account, this.componentDidMount.bind(this))} />
            </ThemeProvider>;

        if(status === connecting)
            return status;

        return <ThemeProvider theme={darkTheme}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <div style={{margin: 10}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>{status}</Grid>
                            <Grid item xs={3}>
                                <Btn onClick={() => this.save()}>Save</Btn>
                            </Grid>
                            <Grid item xs={3}>
                                <Btn onClick={() => this.change('account', null, () => window.location.reload())}>Disconnect</Btn>
                            </Grid>
                        </Grid>
                    </div>

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

                    <TabPanel value={this.state.tab} index={2}>
                        <XpSummary
                            name={`${account.name} (${account.player})`}
                            onChange={value => this.change('xp', value)}
                            xp={xp} /><br />
                        <Btn onClick={() => window.confirm('Really clear XP?') && this.change('xp', {})}>Clear XP</Btn>
                    </TabPanel>

                    <TabPanel value={this.state.tab} index={3}>
                        {log.map(r => <Roll {...r} key={r.id} />)}
                    </TabPanel>
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
