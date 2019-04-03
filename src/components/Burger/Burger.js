import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients).map( igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    }).reduce( (acc, cur) => {
        return acc.concat(cur);
    }, [] );
    
    return(
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            { transformedIngredients.length === 0 ? <p>Please start adding ingredients</p> : transformedIngredients }
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;