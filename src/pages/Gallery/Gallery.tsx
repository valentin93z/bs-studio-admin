import axios from 'axios';
import React, { FC, useEffect } from 'react';
import { gallerySlice } from '../../app/gallerySlice/gallerySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { interfaceSlice } from '../../app/interfaceSlice/interfaceSlice';
import { IFile } from '../../models/IGallery';
import { URL } from '../../utils/consts';
import classes from './Gallery.module.css';

const Gallery: FC = () => {

  const dispatch = useAppDispatch();
  const { gallery } = useAppSelector(state => state.galleryReducer);

  const fetchFiles = async () => {
    const response = await axios.get(`${URL}/upload`);
    dispatch(gallerySlice.actions.setGallery(response.data));
  }

  const deleteFile = async (file: IFile) => {
    await axios.delete(`${URL}/upload`, {data: { id: file._id, filename: file.filename }});
    fetchFiles();
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <section className={classes.gallery}>
      <div className={classes.gallery__head}>
        <h4 className={classes.gallery__header}>Галерея</h4>
        <button className={classes.gallery__header_button} onClick={() => dispatch(interfaceSlice.actions.setGalleryModal('new'))}>
          <svg width='16px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>
          <span>Загрузить</span>
        </button>
      </div>
      <ul className={classes.gallery__list}>
        {gallery.map((image) =>
        <li className={classes.gallery__item} key={String(image._id)}>
          <img className={classes.gallery__image} src={`${URL}/uploads/${image.filename}`} alt={image.filename}/>
          <div className={classes.image__buttons}>
            <div className={classes.image__button}>
              <svg height='14px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M144 80c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
            </div>
            <div className={classes.image__button} onClick={() => deleteFile(image)}>
              <svg width='10px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
            </div>
          </div>
        </li>)}
      </ul>
    </section>
  )
}

export default Gallery;