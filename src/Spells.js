
import { Button, ButtonGroup, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react';
import { Btn, Pool } from './common';
import { spell_list } from './data';

import DeleteIcon from '@mui/icons-material/Delete';

const spell_map = spell_list.reduce((map, s) => {
    map[s.Spell] = s;
    return map;
}, {});

export default class Spells extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: spell_list[0].Spell };
    }

    add() {
        const {spells} = this.props;
        const {selected} = this.state;
        this.props.onChange({[selected]: 0, ...spells});
    }

    change(stat, value) {
        this.props.onChange({...this.props.spells, [stat]: value | 0});
    }

    remove(spell) {
        if(window.confirm(`Really remove ${spell}?`)) {
            const {spells} = this.props;
            delete spells[spell];
            this.props.onChange(spells);
        }
    }

    render() {
        const {skills, spells, onRoll} = this.props;

        return <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>School</TableCell>
                        <TableCell>Spell</TableCell>
                        <TableCell>Complexity</TableCell>
                        <TableCell>Costs</TableCell>
                        <TableCell>Modifier</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.keys(spells).map(s => {
                        const spell = spell_map[s];
                        const mod = spells[s];
                        const pool = (skills[spell.School] | 0) - parseInt(spell.Complexity) + mod;

                        return <TableRow>
                            <TableCell>{spell.School}</TableCell>
                            <TableCell>{spell.Spell}</TableCell>
                            <TableCell>{spell.Complexity}</TableCell>
                            <TableCell>{spell['Power Costs']}</TableCell>
                            <TableCell sx={{width: 200}}><Pool label="Mod." value={mod} name={s} onChange={this.change.bind(this)} /></TableCell>
                            <TableCell><ButtonGroup>
                                <Button sx={{width: 150}} disabled={pool < 1} onClick={() => onRoll(pool, spell.School)}>Roll {pool} dice</Button>
                                <Button onClick={() => this.remove(s)}><DeleteIcon fontSize='small' /></Button>
                            </ButtonGroup></TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>


            <ButtonGroup sx={{ marginTop: 3 }} variant='contained' fullWidth>
                <TextField fullWidth label="Add Spell" value={this.state.selected} onChange={e => this.setState({ selected: e.target.value })} select>
                    {spell_list.map(spell => <MenuItem value={spell.Spell} key={spell.Spell}>{spell.Spell}</MenuItem>)}
                </TextField>

                <Button onClick={this.add.bind(this)}>Add Spell</Button>
            </ButtonGroup>
        </React.Fragment>;
    }
}
