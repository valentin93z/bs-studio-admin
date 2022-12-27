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
        {event.client && event.service && event.master
          ?
            <div className={classes.event__client}>
              <p className={classes.event__firstName}>{event.client?.firstName}</p>
              <p className={classes.event__lastName}>{event.client?.lastName}</p>
              <p className={classes.event__clientPhone}>{event.client?.phone}</p>
              <p className={classes.event__service}>{event.service}</p>
              <p className={classes.event__master}>Мастер: {event.master}</p>
            </div>
          :
            <div className={classes.event__free}>Свободное окно</div>
        }
        
      </li>)}
    </ul>
  )
}

export default EventList;