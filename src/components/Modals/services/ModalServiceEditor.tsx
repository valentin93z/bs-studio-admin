import React, { FC, useEffect } from 'react';
import classes from '../Modal.module.css';
import { Params, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { serviceSlice } from '../../../app/serviceSlice/serviceSlice';
import axios from 'axios';
import { URL } from '../../../utils/consts';

const ModalServiceEditor: FC = () => {

    const params = useParams();
    const dispatch = useAppDispatch();
    const { service, services } = useAppSelector(state => state.serviceReducer);
    const { servicesModal } = useAppSelector(state => state.interfaceReducer);

    const closeModalWindow = () => {
      dispatch(interfaceSlice.actions.setServicesModal('none'));
      dispatch(serviceSlice.actions.setReset());
    }

    const findService = (params: Readonly<Params<string>>) => {
      const serviceId = Object.values(params).toString().replace('services/', '');
      const serviceData = services.filter((item) => item._id === serviceId);
      dispatch(serviceSlice.actions.loadServiceData(serviceData[0]));
    }

    const fetchServices = async () => {
      const response = await axios.get(`${URL}/services`);
      dispatch(serviceSlice.actions.setServices(response.data));
    }

    const addService = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.post(`${URL}/services`, {
        title: service.title,
        price: service.price,
        type: service.type,
        status: service.status,
        description: service.description,
      }).then(() => {
        closeModalWindow();
        fetchServices();
        }).catch((err) => console.log(err))
    }

    const editService = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.patch(`${URL}/services`, {
        id: service._id,
        title: service.title,
        price: service.price,
        type: service.type,
        status: service.status,
        description: service.description,
        }).then(() => {
          closeModalWindow();
          fetchServices();
        }).catch((err) => console.log(err))
      }

    useEffect(() => {
      if (servicesModal === 'edit') {
        findService(params);
      }
    }, []);

  return (
    <div className={classes.modal__root} onClick={closeModalWindow}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <form className={classes.modal__form}>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='title'>Наименование услуги</label>
            <input
              className={classes.modal__input}
              type="text"
              id='title'
              value={service.title}
              onChange={(e) => dispatch(serviceSlice.actions.setTitle(e.target.value))}
            />
          </div>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='price'>Стоимость</label>
            <input
              className={classes.modal__input}
              type="text"
              id='price'
              value={service.price}
              onChange={(e) => dispatch(serviceSlice.actions.setPrice(e.target.value))}
            />
          </div>
          <div className={classes.input__container}>
            <label className={classes.modal__label} htmlFor='type'>Тип услуги</label>
            <input
              className={classes.modal__input}
              type="text"
              id='type'
              value={service.type}
              onChange={(e) => dispatch(serviceSlice.actions.setType(e.target.value))}
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
                  checked={service.status === 'active'}
                  onChange={(e) => dispatch(serviceSlice.actions.setStatus(e.target.value))}
                />
                <label className={classes.toggle__button} htmlFor='active'>Активная</label>
              </li>
              <li className={classes.toggle__item}>
                <input
                  className={classes.toggle__radio}
                  type="radio"
                  name="status"
                  id="disable"
                  value="disable"
                  checked={service.status === 'disable'}
                  onChange={(e) => dispatch(serviceSlice.actions.setStatus(e.target.value))}
                />
                <label className={classes.toggle__button} htmlFor='disable'>Неактивная</label>
              </li>
            </ul>
          </div>
          <div className={classes.textarea__container}>
            <label className={classes.modal__label} htmlFor='description'>Дополнительная информация</label>
            <textarea
              className={classes.modal__textarea}
              id="description"
              rows={3}
              value={service.description}
              onChange={(e) => dispatch(serviceSlice.actions.setDescription(e.target.value))}
            >
            </textarea>
          </div>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            {servicesModal === 'new' && <button className={classes.button__action} type='button' onClick={addService}>Добавить</button>}
            {servicesModal === 'edit' && <button className={classes.button__action} type='button' onClick={editService}>Сохранить</button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalServiceEditor;