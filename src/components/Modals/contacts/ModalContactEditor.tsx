import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { contactSlice } from '../../../app/contactSlice/contactSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { URL } from '../../../utils/consts';
import classes from '../Modal.module.css';

const ModalContactEditor: FC = () => {

  const dispatch = useAppDispatch();
  const { _id, address, schedule, phone, social } = useAppSelector(state => state.contactReducer);

  const closeModalWindow = () => {
    dispatch(interfaceSlice.actions.setContactsModal('none'));
  }

  const fetchContacts = async () => {
    const response = await axios.get(`${URL}/contacts`);
    dispatch(contactSlice.actions.setContacts(response.data[0]));
  }

  const editContacts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.patch(`${URL}/contacts`, {
      id: _id,
      address,
      schedule,
      phone,
      social,
    }).then(() => {
      closeModalWindow();
      fetchContacts();
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className={classes.modal__root} onClick={closeModalWindow}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <form className={classes.modal__form}>
          <div className={classes.modal__form_two_column}>
            <div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='city'>Город</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='city'
                  value={address.city}
                  onChange={(e) => dispatch(contactSlice.actions.setCity(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='street'>Улица</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='street'
                  value={address.street}
                  onChange={(e) => dispatch(contactSlice.actions.setStreet(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='house'>Дом</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='house'
                  value={address.house}
                  onChange={(e) => dispatch(contactSlice.actions.setHouse(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='schedule'>График работы</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='schedule'
                  value={schedule}
                  onChange={(e) => dispatch(contactSlice.actions.setSchedule(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='phone'>Телефон</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='phone'
                  value={phone}
                  onChange={(e) => dispatch(contactSlice.actions.setPhone(e.target.value))}
                />
              </div>
            </div>
            <div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='instagram'>Instagram</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='instagram'
                  value={social.instagram}
                  onChange={(e) => dispatch(contactSlice.actions.setSocialInstagram(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='telegram'>Telegram</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='telegram'
                  value={social.telegram}
                  onChange={(e) => dispatch(contactSlice.actions.setSocialTelegram(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='vk'>VKontakte</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='vk'
                  value={social.vk}
                  onChange={(e) => dispatch(contactSlice.actions.setSocialVk(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='whatsapp'>WhatsApp</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='whatsapp'
                  value={social.whatsapp}
                  onChange={(e) => dispatch(contactSlice.actions.setSocialWatsapp(e.target.value))}
                />
              </div>
              <div className={classes.input__container}>
                <label className={classes.modal__label} htmlFor='viber'>Viber</label>
                <input
                  className={classes.modal__input}
                  type="text"
                  id='viber'
                  value={social.viber}
                  onChange={(e) => dispatch(contactSlice.actions.setSocialViber(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            <button className={classes.button__action} type='button' onClick={editContacts}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalContactEditor;