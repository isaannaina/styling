

import React, { useContext } from 'react';
import classes from './Header.module.css'
import { CartContext } from '../App';

const Header = ({ toggleCart }) => {
  const cartItems = useContext(CartContext);

  return (
    <header className={classes.header}>
      <h1 className={classes.headertitle}>T-Shirt Hub</h1>
      <button className={classes.headercartbutton}onClick={toggleCart}>Cart ({cartItems.length})</button>
    </header>
  );
};

export default Header;
