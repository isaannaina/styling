
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../Redux/CartSlice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); // Get the totalQuantity from the store
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span> {/* Display the totalQuantity */}
    </button>
  );
};

export default CartButton;
