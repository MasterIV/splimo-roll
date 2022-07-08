
import React from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';

import { skill_list, skill_list_flat } from './data';
import { Btn, Pool } from './common';

export default class Skills extends React.Component {
    constructor(props) {
        super(props);
    }

    change(stat, value) {
        this.props.onChange({...this.props.skills, [stat]: Math.max(0, value | 0)});
    }

    render() {
        let attr = null;

        return <Table padding="none" size="small">
                <TableBody>
                    {skill_list_flat.map(s => {
                        const pool = this.props.skills[s.skill] | 0;
                        return <TableRow key={s.skill}>
                            {attr !== s.attribute && <TableCell rowSpan={skill_list[s.attribute].length}>{attr = s.attribute}</TableCell>}

                            <TableCell>
                                {s.skill}
                            </TableCell><TableCell sx={{width: 220, padding: .3}}>
                                <Pool name={s.skill} value={pool} onChange={this.change.bind(this)} />
                            </TableCell><TableCell>
                                <Btn disabled={pool < 1} onClick={() => this.props.onRoll(pool, s.skill)}>Roll {pool} dice</Btn>
                            </TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>;
    }
}
