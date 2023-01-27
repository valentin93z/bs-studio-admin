import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { interfaceSlice } from '../../app/interfaceSlice/interfaceSlice';
import { masterSlice } from '../../app/masterSlice/masterSlice';
import { URL } from '../../utils/consts';
import classes from './Masters.module.css';

const Masters: FC = () => {

  const dispatch = useAppDispatch();
  const { masters } = useAppSelector(state => state.masterReducer);

  const fetchMasters = async () => {
    const response = await axios.get(`${URL}/masters`);
    dispatch(masterSlice.actions.setMasters(response.data));
  }

  const deleteMaster = (id: string) => {
    axios.delete(`${URL}/masters`, { data: {id} });
  }

  useEffect(() => {
    fetchMasters();
  }, []);

  return (
    <section className={classes.masters}>
      <div className={classes.masters__head}>
        <h4 className={classes.masters__header}>Мастера</h4>
        <button className={classes.masters__header_button} onClick={() => dispatch(interfaceSlice.actions.setMastersModal('new'))}>
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
            <div className={classes.masters__item_button}>
              <Link className={classes.masters__button_edit} to={master._id}>
                <svg width='16px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
              </Link>
              <Link className={classes.masters__button_delete} to={master._id}>
                <svg width='16px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </Link>
            </div>
          </li>)}
      </ul>
    </section>
  )
}

// onClick={() => deleteMaster(master._id)}

export default Masters;