import { Link } from 'react-router-dom';
import React from 'react';
import CartButton from './CartButton';

const Header = ({ cartItemCount, handleCartToggle }) => {
  return (
    <header className="bg-dark ">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to ="/" className="navbar-brand">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="navbar-brand">Store</Link>
              </li>
              <li className="nav-item">
                <Link to ="contact" className="navbar-brand">ContactUs</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="navbar-brand">About Us</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <CartButton cartItemCount={cartItemCount} onClick={handleCartToggle} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
