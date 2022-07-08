
import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';

import { skill_list_flat } from './data';
import { Btn, Pool } from './common';

export default class XpSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    change(stat, value) {
        const [skill, player] = stat.split('-');
        const xp = {...this.props.xp};
        if(!xp[skill]) xp[skill] = {};
        xp[skill][player] = Math.max(0, value | 0);
        this.props.onChange(xp);
    }

    render() {
        const {xp, name} = this.props;
        const players = new Set();

        players.add(name);
        Object.keys(xp).forEach(s => Object.keys(xp[s]).forEach(p => players.add(p)));
        const playerNames = Array.from(players);

        return <Table padding="none" size="small">
                <TableBody>
                    {skill_list_flat.map(s => <TableRow key={s.skill}>
                        <TableCell>
                            {s.skill}
                        </TableCell>

                        {playerNames.map(p => <TableCell sx={{width: 220, padding: .3}}>
                            <Pool
                                label={p}
                                value={(xp[s.skill] && xp[s.skill][p]) | 0}
                                name={s.skill+'-'+p}
                                onChange={this.change.bind(this)} />
                        </TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>;
    }
}
