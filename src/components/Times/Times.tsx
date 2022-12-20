import { createTheme, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material';
import React, { FC } from 'react';
import { eventSlice } from '../../app/eventSlice/eventSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classes from './Times.module.css';
import { timesData } from './timesData';

const Times: FC = () => {

    const dispatch = useAppDispatch();
    const { newEvent } = useAppSelector(state => state.eventReducer);

    const theme = createTheme({
        palette: {
          primary: {
            main: '#968981',
          },
        },
      });

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
    <ThemeProvider theme={theme}>
        <div className={classes.times}>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="hours-label">Часы</InputLabel>
                <Select
                    labelId="hours-label"
                    id="hours"
                    value={newEvent.time.hours}
                    onChange={(e: SelectChangeEvent) => dispatch(eventSlice.actions.setHours(e.target.value))}
                    label="Часы"
                    MenuProps={MenuProps}
                >
                    {timesData.hours.map((item) =>
                    <MenuItem key={item} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="minutes-label">Минуты</InputLabel>
                <Select
                    labelId="minutes-label"
                    id="minutes"
                    value={newEvent.time.minutes}
                    onChange={(e: SelectChangeEvent) => dispatch(eventSlice.actions.setMinutes(e.target.value))}
                    label="Минуты"
                >
                    {timesData.minutes.map((item) =>
                    <MenuItem key={item} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </ThemeProvider>
  )
}

export default Times;