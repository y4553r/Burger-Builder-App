import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'}
];

const BuildControls = props => {
    const disabledInfo = {...props.ingredients};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
    }
    return(
        <div className={styles.BuildControls}>
            <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map( control => {
                return <BuildControl 
                            key={control.label} 
                            label={control.label}
                            type={control.type}
                            add={() => props.ingredientAdded(control.type)}
                            remove={() => props.ingredientRemoved(control.type)}
                            disabledInfo={disabledInfo} />
            })}
            <button className={styles.OrderButton} onClick={props.clicked} disabled={!props.purchasable}>Order NOW</button>
        </div>
    );
};

export default BuildControls;