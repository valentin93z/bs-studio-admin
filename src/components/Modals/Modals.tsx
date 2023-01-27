import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import ModalAddNew from './masters/ModalAddNew';

const Modals: FC = () => {

    const { mastersModal, servicesModal } = useAppSelector(state => state.interfaceReducer);

  return (
    <>
      {mastersModal === 'new' && <ModalAddNew />}
    </>
  )
}

export default Modals;