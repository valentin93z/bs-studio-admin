import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { privateRoutes } from '../router/router';

const Panel: FC = () => {
  return (
    <div className='panel_page'>
        <Navbar />
        <div className='panel_page__container'>
            <Sidebar />
            <Routes>
              {privateRoutes.map((route) =>
              <Route key={route.path} path={route.path} element={<route.element/>} />)}
              <Route path='*' element={<Navigate to='main' replace />} />
            </Routes>
        </div>
    </div>
  )
}

export default Panel;