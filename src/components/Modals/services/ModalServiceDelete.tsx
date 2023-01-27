import React, { FC } from 'react';
import classes from '../Modal.module.css';
import { useAppDispatch } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { Params, useParams } from 'react-router-dom';
import axios from 'axios';
import { serviceSlice } from '../../../app/serviceSlice/serviceSlice';
import { URL } from '../../../utils/consts';

const ModalServiceDelete: FC = () => {

  const params = useParams();
  const dispatch = useAppDispatch();

  const closeModalWindow = () => {
    dispatch(interfaceSlice.actions.setServicesModal('none'));
  }

  const fetchServices = async () => {
    const response = await axios.get(`${URL}/services`);
    dispatch(serviceSlice.actions.setServices(response.data));
  }

  const deleteService = (params: Readonly<Params<string>>) => {
    const serviceId = Object.values(params).toString().replace('services/', '');
    axios.delete(`${URL}/services`, { data: {id: serviceId} })
        .then(() => {
            closeModalWindow();
            fetchServices();
        }).catch((err) => console.log(err))
  }

  return (
    <div className={classes.modal__root} onClick={closeModalWindow}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modal__form}>
          <p className={classes.modal__label}>Удалить услугу из списка?</p>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            <button className={classes.button__action} type='button' onClick={() => deleteService(params)}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalServiceDelete;