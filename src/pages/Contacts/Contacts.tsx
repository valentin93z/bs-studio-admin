import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { contactSlice } from '../../app/contactSlice/contactSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { interfaceSlice } from '../../app/interfaceSlice/interfaceSlice';
import { URL } from '../../utils/consts';
import classes from './Contacts.module.css';

const Contacts: FC = () => {

  const dispatch = useAppDispatch();
  const { address, schedule, phone, social } = useAppSelector(state => state.contactReducer);

  const fetchContacts = async () => {
    const response = await axios.get(`${URL}/contacts`);
    dispatch(contactSlice.actions.setContacts(response.data[0]));
    console.log(response.data);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <section className={classes.contacts}>
      <div className={classes.contacts__head}>
        <h4 className={classes.contacts__header}>Контакты</h4>
        <button className={classes.contacts__header_button} onClick={() => dispatch(interfaceSlice.actions.setContactsModal('edit'))}>
        <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
          <span>Редактировать</span>
        </button>
      </div>
      <ul className={classes.contacts__list}>
        <li className={classes.contacts__item}>
          <h4 className={classes.contacts__title}>Адрес</h4>
          <p>г.{address.city} ул.{address.street} д.{address.house}</p>
        </li>
        <li className={classes.contacts__item}>
          <h4 className={classes.contacts__title}>График работы</h4>
          <p>{schedule}</p>
        </li>
        <li className={classes.contacts__item}>
          <h4 className={classes.contacts__title}>Телефон</h4>
          <p>{phone}</p>
        </li>
        <li className={classes.contacts__item}>
          <h4 className={classes.contacts__title}>Социальные сети</h4>
          {social.instagram && <p>Instagram: {social.instagram}</p>}
          {social.telegram && <p>Telegram: {social.telegram}</p>}
          {social.vk && <p>Vkontakte: {social.vk}</p>}
          {social.whatsapp && <p>WhatsApp: {social.whatsapp}</p>}
          {social.viber && <p>Viber: {social.viber}</p>}
        </li>
      </ul>
    </section>
  )
}

export default Contacts;