import React from 'react';

import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        clicked={props.cancel}
        btnType="Danger" >CANCEL</Button>
      <Button
        clicked={props.continue}
        btnType="Success" >CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;