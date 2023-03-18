import { Fragment } from "react";
import classes from  './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>REACTMEALS</h1>
        <HeaderCartButton onClick ={props.onshowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src="https://media.istockphoto.com/id/660196744/photo/restaurant-chilling-out-classy-lifestyle-reserved-concept.jpg?s=1024x1024&w=is&k=20&c=aBhTZAKHDiWBz2gWmc7O6BcyTCsTiqoFtLmyDntx8g8=" alt="finish your hunger completely" />
      </div>
    </Fragment>
  );
};

export default Header;
