import React, { FC } from 'react';
import Main from '../components/Main/Main';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const Panel: FC = () => {
  return (
    <div className='panel_page'>
        <Navbar />
        <div className='panel_page__container'>
            <Sidebar />
            <Main />
        </div>
    </div>
  )
}

export default Panel;