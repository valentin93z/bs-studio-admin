import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { masterSlice } from '../../app/masterSlice/masterSlice';
import classes from './Masters.module.css';

const Masters: FC = () => {

  const dispatch = useAppDispatch();
  const { masters } = useAppSelector(state => state.masterSlice);

  const fetchMasters = async () => {
    const response = await axios.get('http://192.168.0.103:4444/masters');
    dispatch(masterSlice.actions.setMasters(response.data));
  }

  useEffect(() => {
    fetchMasters();
  }, []);

  return (
    <section className={classes.masters}>
      <div className={classes.masters__head}>
        <h4 className={classes.masters__header}>Мастера</h4>
        <button className={classes.masters__header_button}>
          <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
          <span>Добавить</span>
        </button>
      </div>
      <ul className={classes.masters__list}>
        {masters.map(master =>
          <li className={classes.masters__item} key={master._id}>
            <div>
              <h4 className={classes.masters__name}>{master.firstName} {master.lastName}</h4>
              <p className={classes.masters__quality}>{master.quality}</p>
            </div>
            <div>
              {master.status === 'active' && <div className={classes.masters__status_active}>Активный</div>}
              {master.status === 'disable' && <div className={classes.masters__status_disable}>Неактивный</div>}
            </div>
            <div>
              {master.description && <div>{master.description}</div>}
            </div>
            <div className={classes.masters__dots_menu}>
              <svg width='24px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"/></svg>
            </div>
          </li>)}
      </ul>
    </section>
  )
}

export default Masters;