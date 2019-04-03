import React from 'react';

import styles from './Order.module.css';

const Order = props => {
  let ingredients = [];
  for (let ingredient in props.ingredients) {
    ingredients.push({type: ingredient, amount: props.ingredients[ingredient]});
  }

  const ing = ingredients.map(i => {
    return <span style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }} key={i}>{i.type} ({i.amount})</span>
  })
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ing}</p>
      <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
    )
}

export default Order;