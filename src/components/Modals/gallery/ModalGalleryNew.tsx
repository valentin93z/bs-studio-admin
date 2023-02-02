import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { gallerySlice } from '../../../app/gallerySlice/gallerySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { interfaceSlice } from '../../../app/interfaceSlice/interfaceSlice';
import { URL } from '../../../utils/consts';
import classes from '../Modal.module.css';

const ModalGalleryNew: FC = () => {

    const dispatch = useAppDispatch();
    const { selectedFiles } = useAppSelector(state => state.galleryReducer);

    const closeModalWindow = () => {
      dispatch(interfaceSlice.actions.setGalleryModal('none'));
      dispatch(gallerySlice.actions.setSelectedFiles(null));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(gallerySlice.actions.setSelectedFiles(e.target.files));
    }

    const fetchFiles = async () => {
      const response = await axios.get(`${URL}/upload`);
      dispatch(gallerySlice.actions.setGallery(response.data));
    }

    const handleUpload = async () => {
      if (!selectedFiles) {
        console.log('Прикрепите файл');
        return;
      }
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      await axios.post(`${URL}/upload`, formData);
      closeModalWindow();
      fetchFiles();
    }


  return (
    <div className={classes.modal__root} onClick={closeModalWindow}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <form className={classes.modal__form}>
          <div className={classes.upload__container}>
            <div className={classes.upload__label}>Добавить фото:</div>
            <label className={classes.upload__button} htmlFor='upload'>
              <svg width='12px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>
              <span>Загрузить</span>
            </label>
            <input
              className={classes.modal__upload}
              type="file"
              id="upload"
              onChange={handleChange}
            />
          </div>
          <div className={classes.upload__preview_container}>
            {selectedFiles
              ?
              <div>
                <p>Имя файла: {selectedFiles[0].name}</p>
                <p>Формат: {selectedFiles[0].type}</p>
                <p>Размер: {(selectedFiles[0].size / 1000).toFixed(2)} Кб</p>
              </div>
              :
              <p>Файл не выбран</p>}
          </div>
          <div className={classes.modal__buttons}>
            <button className={classes.button__cancel} type='button' onClick={closeModalWindow}>Отмена</button>
            <button className={classes.button__action} type='button' onClick={handleUpload}>Добавить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalGalleryNew;