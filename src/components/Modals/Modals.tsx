import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import ModalAddNew from './masters/ModalAddNew';
import ModalDelete from './masters/ModalDelete';

const Modals: FC = () => {

    const { mastersModal, servicesModal } = useAppSelector(state => state.interfaceReducer);

  return (
    <>
      {mastersModal === 'new' && <ModalAddNew />}
      {mastersModal === 'edit' && <ModalAddNew />}
      {mastersModal === 'delete' && <ModalDelete />}
    </>
  )
}

export default Modals;