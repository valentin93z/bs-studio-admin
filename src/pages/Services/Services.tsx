import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { interfaceSlice } from '../../app/interfaceSlice/interfaceSlice';
import { serviceSlice } from '../../app/serviceSlice/serviceSlice';
import { URL } from '../../utils/consts';
import classes from './Services.module.css';

const Services: FC = () => {

  const dispatch = useAppDispatch();
  const { services } = useAppSelector(state => state.serviceReducer);

  const fetchServices = async () => {
    const response = await axios.get(`${URL}/services`);
    dispatch(serviceSlice.actions.setServices(response.data));
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className={classes.services}>
      <div className={classes.services__head}>
        <h4 className={classes.services__header}>Услуги</h4>
        <button className={classes.services__header_button} onClick={() => dispatch(interfaceSlice.actions.setServicesModal('new'))}>
          <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 384c-79.5 0-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144zm16-208c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/></svg>
          <span>Добавить</span>
        </button>
      </div>
      <ul className={classes.services__list}>
        {services.map((service) =>
        <li className={classes.services__item} key={String(service._id)}>
          <div>
            <h4 className={classes.services__title}>{service.title}</h4>
            <p className={classes.services__type}>{service.type}</p>
          </div>
          <div>
            {service.status === 'active' && <div className={classes.services__status_active}>Активная</div>}
            {service.status === 'disable' && <div className={classes.services__status_disable}>Неактивная</div>}
          </div>
          <div>
            {service.description && <div>{service.description}</div>}
          </div>
          <div>
            <h4 className={classes.services__price}>{service.price} руб.</h4>
          </div>
          <div className={classes.services__item_button}>
            <Link className={classes.services__button_edit} to={service._id} onClick={() => dispatch(interfaceSlice.actions.setServicesModal('edit'))}>
              <svg width='16px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
            </Link>
            <Link className={classes.services__button_delete} to={service._id} onClick={() => dispatch(interfaceSlice.actions.setServicesModal('delete'))}>
              <svg width='16px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </Link>
          </div>
        </li>)}
      </ul>
    </section>
  )
}

export default Services;