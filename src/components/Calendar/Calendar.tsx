import React, { FC, useEffect } from 'react';
import classes from './Calendar.module.css';
import { calendarSlice } from '../../app/calendarSlice/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { daysNames } from './daysNames';
import { monthNames } from './monthNames';
import { getDaysOfMonth } from '../../utils/getDaysOfMonth';
import { eventSlice } from '../../app/eventSlice/eventSlice';
import { IEvent } from '../../models/IEvent';
import { IDay } from '../../models/IDay';

const Calendar: FC = () => {

  const dispatch = useAppDispatch();
  const { date, days } = useAppSelector(state => state.calendarReducer);
  const { events, newEvent } = useAppSelector(state => state.eventReducer);

  const year = date && new Date(date).getFullYear();
  const monthName = date && monthNames[new Date(date).getMonth()];


  useEffect(() => {
    dispatch(calendarSlice.actions.getDays(getDaysOfMonth(year, date && new Date(date).getMonth())));
  }, [date]);

  const setDayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(eventSlice.actions.setDate(e.target.value));
  }

  const eventsOnDay = (eventArr: IEvent[], dayArr: IDay[]) => {
    dayArr.map((day) => eventArr.filter((event) =>
    day.year === event.date.year && day.month === event.date.month && day.dayOfMonth === event.date.day && <div className={classes.circle} key={event._id}></div>))
  }

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
              key={`${day.dayOfMonth}_${day.month}_${day.year}`}
              style={ day.dayOfMonth === 1 ? {gridColumn: day.dayOfWeek} : {}}
            >
              <input
                className={classes.daysOfMonth__radio}
                type="radio"
                name="dayOfMonth"
                id={`${day.dayOfMonth}_${day.month}_${day.year}`}
                value={JSON.stringify(day)}
                onChange={setDayValue}
                checked={day.year === newEvent.date.year && day.month === newEvent.date.month && day.dayOfMonth === newEvent.date.day}
              />
              <label className={classes.daysOfMonth__label} htmlFor={`${day.dayOfMonth}_${day.month}_${day.year}`}>
                <div>{day.dayOfMonth}</div>
                <div className={classes.event__status}>
                  {events.map((event) =>
                  event.date.year === day.year
                    && event.date.month === day.month
                    && event.date.day === day.dayOfMonth
                    && <div className={ event.status === 'free' ? classes.event__status_free : classes.event__status_ordered} key={event._id}></div>)}
                </div>
              </label>
            </li>)}
          </ul>
        </div>
    </div>
  )
}

export default Calendar;