import React, { FC, useEffect } from 'react';
import classes from './Calendar.module.css';
import { calendarSlice } from '../../app/calendarSlice/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { daysNames } from './daysNames';
import { monthNames } from './monthNames';
import { getDaysOfMonth } from '../../utils/getDaysOfMonth';

const Calendar: FC = () => {

  const dispatch = useAppDispatch();
  const { date, days } = useAppSelector(state => state.calendarReducer);

  const year = date && new Date(date).getFullYear();
  const monthName = date && monthNames[new Date(date).getMonth()];


  useEffect(() => {
    dispatch(calendarSlice.actions.getDays(getDaysOfMonth(year, date && new Date(date).getMonth())));
  }, [date]);


  return (
    <div className={classes.calendar}>
        <div>
          <button onClick={() => dispatch(calendarSlice.actions.decrementMonth())}>{'<'}</button>
          {monthName} {year}
          <button onClick={() => dispatch(calendarSlice.actions.incrementMonth())}>{'>'}</button>
        </div>
        <div>
          <ul className={classes.daysOfWeek__list}>
            {daysNames.map((day) =>
            <li className={classes.daysOfWeek__item} key={day}>{day}</li>)}
          </ul>
        </div>
        <div>
          <ul className={classes.dayOfMonth__list}>
            {days.map((day) =>
            <li
              className={classes.daysOfMonth__item}
              key={day.dayOfMonth}
              style={ day.dayOfMonth === 1 ? {gridColumn: day.dayOfWeek} : {}}
            >
              {day.dayOfMonth}
            </li>)}
          </ul>
        </div>
    </div>
  )
}

export default Calendar;