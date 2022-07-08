import React from 'react';

import { Button, ButtonGroup, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Btn = props =>  <Button variant='outlined' fullWidth {...props} />;

export const Pool = ({name, value, onChange, label="Pool"}) => <ButtonGroup variant="contained">
    <Button onClick={() => onChange(name, value - 1)}><RemoveIcon fontSize="small" /></Button>
    <TextField
        id={'skill-' + name}
        label={label}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        variant="filled"
        sx={{width: 100}}
        size="small" />
    <Button onClick={() => onChange(name, value + 1)}><AddIcon fontSize="small"  /></Button>
</ButtonGroup>;
