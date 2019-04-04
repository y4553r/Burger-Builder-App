import React, { Component } from 'react';

// import styles from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate = () => {
        
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span> : {this.props.ingredients[key]}</li>;
        });
        return (
            <div>
                <h3>Your Order</h3>
                <p>A delecious burger with following ingredients : </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p style={{textAlign: 'center', fontWeight: 'bold'}}>The price is : {this.props.price.toFixed(2)}$</p>
                <p>Continue to Checkout ?</p>
                <Button clicked={this.props.purchaseCancel} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType='Success'>CONTINUE</Button>
            </div>
        );
    }
};

export default OrderSummary;