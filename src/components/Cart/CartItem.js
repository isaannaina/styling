
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../Redux/CartSlice';
import classes from './CartItem.module.css';
const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const increaseQuantityHandler = () => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQuantityHandler = () => {
    dispatch(decreaseQuantity(id));
  };

  const removeItemHandler = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total ? total.toFixed(2) : '0.00'} <span className={classes.itemprice}>({price ? `$${price.toFixed(2)}` : '$0.00'}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseQuantityHandler}>-</button>
          <button onClick={increaseQuantityHandler}>+</button>
        </div>
        <div className={classes.remove}>
          <button onClick={removeItemHandler}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
