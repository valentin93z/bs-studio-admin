import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import classes from './EventList.module.css';

const EventList: FC = () => {

  const { events, newEvent } = useAppSelector(state => state.eventReducer);

  return (
    <ul className={classes.event__list}>
      {events.filter((event) =>
      event.date.year === newEvent.date.year &&
      event.date.month === newEvent.date.month &&
      event.date.day === newEvent.date.day).map((event) =>
      <li className={classes.event__item} key={event._id}>
        <div className={classes.event__timing}>
          <p className={classes.event__time}>{event.time.hours}:{event.time.minutes}</p>
          <p className={classes.event__date}>{event.date.day}.{event.date.month}.{event.date.year}</p>
        </div>
        <div className={classes.event__}>
          <p className={classes.event__}>Имя</p>
          <p className={classes.event__}>Фамилия</p>
          <p className={classes.event__}>8-904-455-65-85</p>
          <p className={classes.event__}>Наращивание ногтей</p>
          <p className={classes.event__}>Мастер Алина</p>
        </div>
      </li>)}
    </ul>
  )
}

export default EventList;