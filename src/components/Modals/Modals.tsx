import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import ModalMasterEditor from './masters/ModalMasterEditor';
import ModalMasterDelete from './masters/ModalMasterDelete';
import ModalServiceEditor from './services/ModalServiceEditor';
import ModalServiceDelete from './services/ModalServiceDelete';

const Modals: FC = () => {

  const { mastersModal, servicesModal } = useAppSelector(state => state.interfaceReducer);

  return (
    <>
      {mastersModal === 'new' && <ModalMasterEditor />}
      {mastersModal === 'edit' && <ModalMasterEditor />}
      {mastersModal === 'delete' && <ModalMasterDelete />}
      {servicesModal === 'new' && <ModalServiceEditor />}
      {servicesModal === 'edit' && <ModalServiceEditor />}
      {servicesModal === 'delete' && <ModalServiceDelete />}
    </>
  )
}

export default Modals;