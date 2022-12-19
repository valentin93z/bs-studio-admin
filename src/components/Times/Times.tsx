import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';
import classes from './Times.module.css';
import { timesData } from './timesData';

const Times: FC = () => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        
        },
    },
    };

  return (
    <div className={classes.times}>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="hours-label">Часы</InputLabel>
            <Select
                labelId="hours-label"
                id="hours"
                // value={}
                // onChange={}
                label="Часы"
                MenuProps={MenuProps}
            >
                {timesData.hours.map((item) =>
                <MenuItem key={item.title} value={item.value}>{item.title}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="minutes-label">Минуты</InputLabel>
            <Select
                labelId="minutes-label"
                id="minutes"
                // value={}
                // onChange={}
                label="Минуты"
            >
                {timesData.minutes.map((item) =>
                <MenuItem key={item.title} value={item.value}>{item.title}</MenuItem>)}
            </Select>
        </FormControl>
    </div>
  )
}

export default Times;