import React from 'react';

import { Button, ButtonGroup, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const margin = {
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
}

export const Btn = props =>  <Button variant='outlined' fullWidth {...props} />;

export const Pool = ({name, value, onChange, label="Pool", width=100}) => <ButtonGroup variant="contained" sx={margin}>
    <Button onClick={() => onChange(name, value - 1)}><RemoveIcon fontSize="small" /></Button>
    <TextField
        id={'skill-' + name}
        label={label}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        variant="filled"
        sx={{width}}
        size="small" />
    <Button onClick={() => onChange(name, value + 1)}><AddIcon fontSize="small"  /></Button>
</ButtonGroup>;
