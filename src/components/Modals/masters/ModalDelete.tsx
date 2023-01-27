import axios from 'axios';
import React, { FC } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { masterSlice } from '../../../app/masterSlice/masterSlice';
import { URL } from '../../../utils/consts';
import classes from '../Modal.module.css';

const ModalDelete: FC = () => {

    const params = useParams();
    const dispatch = useAppDispatch();

    const closeModalWindow = () => {
        dispatch(interfaceSlice.actions.setMastersModal('none'));
    }

    const fetchMasters = async () => {
        const response = await axios.get(`${URL}/masters`);
        dispatch(masterSlice.actions.setMasters(response.data));
      }

    const deleteMaster = (params: Readonly<Params<string>>) => {
        const masterId = Object.values(params).toString().replace('masters/', '');
        axios.delete(`${URL}/masters`, { data: {id: masterId} })
            .then(() => {
                closeModalWindow();
                fetchMasters();
            }).catch((err) => console.log(err))
      }

  return (
    <div className={classes.modal__root} onClick={() => dispatch(interfaceSlice.actions.setMastersModal('none'))}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modal__form}>
          <p className={classes.modal__label}>Удалить мастера из списка?</p>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            <button className={classes.button__action} type='button' onClick={() => deleteMaster(params)}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete;