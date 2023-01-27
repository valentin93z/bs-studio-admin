import axios from 'axios';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { masterSlice } from '../../../app/masterSlice/masterSlice';
import { URL } from '../../../utils/consts';
import classes from '../Modal.module.css';

const ModalAddNew: FC = () => {

    const dispatch = useAppDispatch();
    const { master } = useAppSelector(state => state.masterReducer);

    const fetchMasters = async () => {
      const response = await axios.get(`${URL}/masters`);
      dispatch(masterSlice.actions.setMasters(response.data));
    }

    const addMaster = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.post(`${URL}/masters`, {
        firstName: master.firstName,
        lastName: master.lastName,
        status: master.status,
        quality: master.quality,
        photoUrl: master.photoUrl,
        description: master.description,
      }).then(() => {
        dispatch(masterSlice.actions.setReset());
        dispatch(interfaceSlice.actions.setMastersModal('none'));
        fetchMasters();
      }).catch((err) => console.log(err))
    }

  return (
    <div className={classes.modal__root} onClick={() => dispatch(interfaceSlice.actions.setMastersModal('none'))}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <form className={classes.modal__form}>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='firstName'>Имя</label>
            <input
              className={classes.modal__input}
              type="text"
              id='firstName'
              value={master.firstName}
              onChange={(e) => dispatch(masterSlice.actions.setFirstName(e.target.value))}
            />
          </div>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='lastName'>Фамилия</label>
            <input
              className={classes.modal__input}
              type="text"
              id='lastName'
              value={master.lastName}
              onChange={(e) => dispatch(masterSlice.actions.setLastName(e.target.value))}
            />
          </div>
          <div className={classes.toggle__container}>
            <div className={classes.toggle__label}>Статус</div>
            <ul className={classes.toggle__list}>
              <li className={classes.toggle__item}>
                <input
                  className={classes.toggle__radio}
                  type="radio"
                  name="status"
                  id="active"
                  value="active"
                  checked={master.status === 'active'}
                  onChange={(e) => dispatch(masterSlice.actions.setStatus(e.target.value))}
                />
                <label className={classes.toggle__button} htmlFor='active'>Активный</label>
              </li>
              <li className={classes.toggle__item}>
                <input
                  className={classes.toggle__radio}
                  type="radio"
                  name="status"
                  id="disable"
                  value="disable"
                  checked={master.status === 'disable'}
                  onChange={(e) => dispatch(masterSlice.actions.setStatus(e.target.value))}
                />
                <label className={classes.toggle__button} htmlFor='disable'>Неактивный</label>
              </li>
            </ul>
          </div>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='quality'>Профессиональный уровень</label>
            <input
              className={classes.modal__input}
              type="text"
              id='quality'
              value={master.quality}
              onChange={(e) => dispatch(masterSlice.actions.setQuality(e.target.value))}
            />
          </div>
          <div className={classes.upload__container}>
            <div className={classes.upload__label}>Фото мастера</div>
            <label className={classes.upload__button} htmlFor='photoUrl'>
              <svg width='12px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>
              <span>Загрузить</span>
            </label>
            <input className={classes.modal__upload} type="file" id="photoUrl" />
          </div>
          <div className={classes.textarea__container}>
            <label className={classes.modal__label} htmlFor='description'>Дополнительная информация</label>
            <textarea
              className={classes.modal__textarea}
              id="description"
              rows={3}
              value={master.description}
              onChange={(e) => dispatch(masterSlice.actions.setDescription(e.target.value))}
            >
            </textarea>
          </div>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} onClick={() => dispatch(interfaceSlice.actions.setMastersModal('none'))}>Отмена</button>
            <button className={classes.button__add} onClick={addMaster}>Добавить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalAddNew;