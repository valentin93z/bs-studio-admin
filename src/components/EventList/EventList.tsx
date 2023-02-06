import axios from 'axios';
import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { URL } from '../../utils/consts';
import classes from './EventList.module.css';

const EventList: FC = () => {

  const { events, newEvent } = useAppSelector(state => state.eventReducer);


  const removeEvent = async (e: React.MouseEvent<HTMLButtonElement>, idEvent: string | undefined) => {
    e.preventDefault();
    console.log(idEvent);
    await axios.delete(`${URL}/events/${idEvent}`)
    .then((res) => console.log(res.data))
  }

  return (
    <ul className={classes.event__list}>
      {events.filter((event) =>
      event.date.year === newEvent.date.year &&
      event.date.month === newEvent.date.month &&
      event.date.day === newEvent.date.day).map((event) =>
      <li className={event.status === 'free' ? classes.event__item_free : classes.event__item_ordered} key={event._id}>
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
              <button onClick={(e) => removeEvent(e, event._id)}>Удалить</button>
              <button>Изменить</button>
            </div>
          :
            <div className={classes.event__free}>Свободное окно</div>
        }
        
      </li>)}
    </ul>
  )
}

export default EventList;