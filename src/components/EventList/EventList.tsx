import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';

const EventList: FC = () => {

  const { events } = useAppSelector(state => state.eventReducer);

  return (
    <div>EventList</div>
  )
}

export default EventList;