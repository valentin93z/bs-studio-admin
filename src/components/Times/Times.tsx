import { createTheme, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { eventSlice } from '../../app/eventSlice/eventSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classes from './Times.module.css';
import { timesData } from './timesData';

const Times: FC = () => {

    const dispatch = useAppDispatch();
    const { events, newEvent } = useAppSelector(state => state.eventReducer);

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

    const addEventRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.post('http://192.168.0.103:4444/events', {
          status: newEvent.status,
          year: newEvent.date.year,
          month: newEvent.date.month,
          day: newEvent.date.day,
          hours: newEvent.time.hours,
          minutes: newEvent.time.minutes,
      })
      .then(() => {
        fetchEvents();
      })
      .catch((e) => {
        console.log('Error:', e);
      })
    }

    const fetchEvents = async () => {
      const response = await axios.get('http://192.168.0.103:4444/all-events');
      dispatch(eventSlice.actions.setEvents(response.data));
    }

    useEffect(() => {
      fetchEvents();
    }, [events]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.times}>
        <div>
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
        <button className={classes.times__button} onClick={addEventRequest}>Добавить ивент</button>
      </div>
    </ThemeProvider>
  )
}

export default Times;