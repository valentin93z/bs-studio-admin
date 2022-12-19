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
        <div className={classes.months}>
          <button className={classes.months__button} onClick={() => dispatch(calendarSlice.actions.decrementMonth())}>{'<'}</button>
          <p>{`${monthName} ${year}г.`}</p>
          <button className={classes.months__button} onClick={() => dispatch(calendarSlice.actions.incrementMonth())}>{'>'}</button>
        </div>
        <div>
          <ul className={classes.daysOfWeek__list}>
            {daysNames.map((day) =>
            <li className={classes.daysOfWeek__item} key={day}>{day}</li>)}
          </ul>
        </div>
        <div>
          <ul className={classes.daysOfMonth__list}>
            {days.map((day) =>
            <li
              className={classes.daysOfMonth__item}
              key={day.dayOfMonth}
              style={ day.dayOfMonth === 1 ? {gridColumn: day.dayOfWeek} : {}}
            >
              <input
                className={classes.daysOfMonth__radio}
                type="radio"
                name="dayOfMonth"
                id={String(day.dayOfMonth)}
              />
              <label className={classes.daysOfMonth__label} htmlFor={String(day.dayOfMonth)}>{day.dayOfMonth}</label>
            </li>)}
          </ul>
        </div>
    </div>
  )
}

export default Calendar;