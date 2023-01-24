import React, { FC } from 'react';
import classes from './Navbar.module.css';

const Navbar: FC = () => {
  return (
    <header className={classes.navbar}>
        <div className={classes.navbar__logo}>MST NAIL</div>
        <div>
            <button className={classes.navbar__button}>Выйти</button>
        </div>
    </header>
  )
}

export default Navbar;