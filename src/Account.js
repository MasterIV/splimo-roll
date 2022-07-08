
import React from 'react';

import {
    Paper,
    Stack,
    TextField
} from '@mui/material';

import { Btn } from './common';

const styles= {
    margin: 'auto',
    padding: 3,
    marginTop: 10,
    width: 400
}

export default class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            player: '',
            name: '',
            room: ''
        }
    }

    render() {
        const {player, name, room} = this.state;

        return <Paper sx={styles}>
            <Stack spacing={2}>
                <TextField variant="filled" label="Player Name" value={player} onChange={e => this.setState({player: e.target.value})} />
                <TextField variant="filled" label="Character Name" value={name} onChange={e => this.setState({name: e.target.value})} />
                <TextField variant="filled" label="Game Room" value={room} onChange={e => this.setState({room: e.target.value})} />
                <Btn onClick={() => this.props.onCreate(this.state)}>Create</Btn>
            </Stack>
        </Paper>;
    }
}
