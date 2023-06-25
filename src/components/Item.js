import React, { useState } from 'react';
import styles from './Item.module.css';

const Item = ({ name, description, price, addToCart }) => {
  const [quantities, setQuantities] = useState({
    Small: 100,
    Medium: 50,
    Large: 25
  });

  const handleQuantityChange = (size) => {
    if (quantities[size] > 0) {
      addToCart({ name, size, price }); // Add item to cart
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [size]: prevQuantities[size] - 1
      }));
    }
  };

  return (
    <div className={styles.item}>
      <h3 className={styles.itemtitle}>{name}</h3>
      <p className={styles.itemdescription}>{description}</p>
      <p className={styles.itemprice}>Price: ${price}</p>
      <div className={styles['item-size']}>
        <button
          type="button"
          onClick={() => handleQuantityChange('Small')}
          disabled={quantities.Small <= 0}
          className={styles['size-button']}
        >
          {quantities.Small} available
        </button>
        <span className={styles['size-label']}>Small</span>
      </div>
      <div className={styles['item-size']}>
        <button
          type="button"
          onClick={() => handleQuantityChange('Medium')}
          disabled={quantities.Medium <= 0}
          className={styles['size-button']}
        >
          {quantities.Medium} available
        </button>
        <span className={styles['size-label']}>Medium</span>
      </div>
      <div className={styles['item-size']}>
        <button
          type="button"
          onClick={() => handleQuantityChange('Large')}
          disabled={quantities.Large <= 0}
          className={styles['size-button']}
        >
          {quantities.Large} available
        </button>
        <span className={styles['size-label']}>Large</span>
      </div>
    </div>
  );
};

export default Item;
