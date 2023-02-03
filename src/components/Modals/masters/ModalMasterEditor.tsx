import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { masterSlice } from '../../../app/masterSlice/masterSlice';
import { URL } from '../../../utils/consts';
import classes from '../Modal.module.css';

const ModalMasterEditor: FC = () => {

    const params = useParams();
    const dispatch = useAppDispatch();
    const { mastersModal } = useAppSelector(state => state.interfaceReducer);
    const { master, masters } = useAppSelector(state => state.masterReducer);

    const closeModalWindow = () => {
      dispatch(interfaceSlice.actions.setMastersModal('none'));
      dispatch(masterSlice.actions.setReset());
    }

    const attachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(masterSlice.actions.setSelectedFile(e.target.files));
    }

    const findMaster = (params: Readonly<Params<string>>) => {
        const masterId = Object.values(params).toString().replace('masters/', '');
        const masterData = masters.filter((item) => item._id === masterId);
        dispatch(masterSlice.actions.loadMasterData(masterData[0]));
    }

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
        description: master.description,
      }).then((res) => {
        if (!master.photo?.selectedFile) {
          closeModalWindow();
          fetchMasters();
        }
        if (master.photo?.selectedFile) {
          const masterId = res.data;
          const formData = new FormData();
          formData.append('photo', master.photo.selectedFile[0]);
          axios.post(`${URL}/masters/${masterId}`, formData).then(() => {
            closeModalWindow();
            fetchMasters();
          })
        }
      }).catch((err) => console.log(err))
    }

    const editMaster = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.patch(`${URL}/masters`, {
        id: master._id,
        firstName: master.firstName,
        lastName: master.lastName,
        status: master.status,
        quality: master.quality,
        description: master.description,
      }).then((res) => {
        const masterId = res.data;
        if (master.photo?.filename) {
          closeModalWindow();
          fetchMasters();
        }
        if (master.photo?.selectedFile) {
          const formData = new FormData();
          formData.append('photo', master.photo.selectedFile[0]);
          axios.patch(`${URL}/masters/${masterId}`, formData).then(() => {
            closeModalWindow();
            fetchMasters();
          })
        }
        if (!master.photo?.selectedFile && !master.photo?.filename) {
          axios.delete(`${URL}/masters/${masterId}`).then(() => {
            closeModalWindow();
            fetchMasters();
          })
        }
      }).catch((err) => console.log(err))
    }

    useEffect(() => {
      if (mastersModal === 'edit') {
        findMaster(params);
      }
    }, []);

  return (
    <div className={classes.modal__root} onClick={closeModalWindow}>
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
          <div className={classes.upload__master_photo_container}>
            <div className={classes.upload__container}>
              <div className={classes.upload__label}>Фото мастера</div>
              {master.photo.filename || master.photo.selectedFile
                ?
                <label className={classes.upload__button_disabled} htmlFor='photoUrl'>
                  <svg width='12px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                  <span>Загружено</span>
                </label>
                :
                <label className={classes.upload__button} htmlFor='photoUrl'>
                  <svg width='12px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>
                  <span>Загрузить</span>
                </label>
              }
              <input
                className={classes.modal__upload}
                type="file"
                id="photoUrl"
                onChange={attachFile}
                disabled={master.photo.filename || master.photo.selectedFile ? true : false}
              />
            </div>
            <div className={classes.upload__status}>
              {master.photo.selectedFile 
                ?
                  <div className={classes.upload__status_container}>
                    <div>
                      <p>Имя файла: {master.photo.selectedFile[0].name}</p>
                      <p>Размер: {(master.photo.selectedFile[0].size / 1000).toFixed(2)} Кб</p>
                    </div>
                    <div className={classes.upload__status_delete} onClick={() => dispatch(masterSlice.actions.setResetPhotoInfo())}>
                      <svg width='10px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                    </div>
                  </div>
                :
                  master.photo.filename 
                    ?
                      <div className={classes.upload__status_container}>
                        <div>
                          <p>Имя файла: {master.photo.filename}</p>
                          <p>Размер: {(master.photo.size / 1000).toFixed(2)} Кб</p>
                        </div>
                        <div className={classes.upload__status_delete} onClick={() => dispatch(masterSlice.actions.setResetPhotoInfo())}>
                          <svg width='10px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                        </div>
                      </div>
                    :
                      <div>Файл не выбран</div>
              }
            </div>
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
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            {mastersModal === 'new' && <button className={classes.button__action} type='button' onClick={addMaster}>Добавить</button>}
            {mastersModal === 'edit' && <button className={classes.button__action} type='button' onClick={editMaster}>Сохранить</button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalMasterEditor;