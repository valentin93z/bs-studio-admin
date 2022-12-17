import React, { FC, useEffect } from 'react';
import { calendarSlice } from '../../app/calendarSlice/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCurrentDate } from '../../utils/getCurrentDate';

const Calendar: FC = () => {

  const dispatch = useAppDispatch();
  const { date } = useAppSelector(state => state.calendarReducer);

  console.log(date && new Date(date));

  return (
    <div>
        <div>
          <button onClick={() => dispatch(calendarSlice.actions.decrementMonth())}>{'<'}</button>
          {date && new Date(date).getMonth()}
          {date && new Date(date).getFullYear()}
          <button onClick={() => dispatch(calendarSlice.actions.incrementMonth())}>{'>'}</button>
        </div>
        <div></div>
    </div>
  )
}

export default Calendar;