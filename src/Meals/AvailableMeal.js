import React from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";

const MEALS_DATA = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const MealItem = ({ name, description, price }) => {
  return (
    <li className={styles["meal-item"]}>
      <div className={styles["meal-item__description"]}>
        <h3>{name}</h3>
        <div>{description}</div>
      </div>
      <div className={styles["meal-item__price"]}>{`$${price.toFixed(2)}`}</div>
    </li>
  );
};

const AvailableMeals = () => {
  return (
    <Card>
    <ul className={styles["meals-container"]}>
      {MEALS_DATA.map((meal) => (
        <MealItem
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ))}
    </ul>
    </Card>
  );
};

export default AvailableMeals;  