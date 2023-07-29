import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ id, title, price }));
    const expense = {
      id,
      title,
      price,
    };

    fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/expenses.json', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add expense to the database.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Expense added to the database:', data);
      })
      .catch((error) => {
        console.error('Error adding expense:', error.message);
      });
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
