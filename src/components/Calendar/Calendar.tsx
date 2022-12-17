import React, { FC } from 'react';
import { calendarSlice } from '../../app/calendarSlice/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { monthNames } from './monthNames';

const Calendar: FC = () => {

  const dispatch = useAppDispatch();
  const { date } = useAppSelector(state => state.calendarReducer);

  const year = date && new Date(date).getFullYear();
  const monthName = date && monthNames[new Date(date).getMonth()];

  return (
    <div>
        <div>
          <button onClick={() => dispatch(calendarSlice.actions.decrementMonth())}>{'<'}</button>
          {monthName} {year}
          <button onClick={() => dispatch(calendarSlice.actions.incrementMonth())}>{'>'}</button>
        </div>
        <div></div>
    </div>
  )
}

export default Calendar;