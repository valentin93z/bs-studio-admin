import React, { FC } from 'react';
import Calendar from '../components/Calendar/Calendar';
import EventList from '../components/EventList/EventList';
import Times from '../components/Times/Times';

const Events: FC = () => {
  return (
    <div>
      <Calendar />
      <Times />
      <EventList />
    </div>
  )
}

export default Events;