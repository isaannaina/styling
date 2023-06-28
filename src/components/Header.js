import React from 'react';
import CartButton from './CartButton';

const Header = ({ cartItemCount, handleCartToggle }) => {
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="navbar-brand" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#">Store</a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#">Bestselling</a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#">About Us</a>
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
