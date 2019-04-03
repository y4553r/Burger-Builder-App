import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-orders';
import { updateObject } from '../../../shared/utility';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.orderConfirmedHandler = this.orderConfirmedHandler.bind(this);
  }

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          exactLength: 5,
        },
        valid: false,
        shouldValidate: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        validation: {},
        value: 'fastest',
        valid: true,
        shouldValidate: false
      }
    },
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.exactLength) {
      isValid = value.length === rules.exactLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, el) => {
    const updateFormElement = updateObject(this.state.orderForm, {
      value: event.target.value,
      valid: this.checkValidity(event.target.value, this.state.orderForm[el].validation),
      shouldValidate: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [el]: updateFormElement
    });
    
    let formIsValid = true;
    for (let element in updatedOrderForm) {
      formIsValid = this.state.orderForm[element].valid && formIsValid;
    }
    this.setState({ orderForme: updatedOrderForm, formIsValid: formIsValid });
  }

  orderConfirmedHandler(event) {
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    formData.userId = this.props.userId;
    const order = {
      ingredients: this.props.ings,
      costumar: formData,
      price: this.props.price
    };
    this.props.onPurchaseBurger(order, this.props.token);
  };

  render() {
    let formElements = Object.keys(this.state.orderForm).map(el => {
      return <Input
        key={el}
        valueType={el}
        elementType={this.state.orderForm[el].elementType}
        elementConfig={this.state.orderForm[el].elementConfig}
        value={this.state.orderForm[el].value}
        invalid={!this.state.orderForm[el].valid}
        shouldValidate={this.state.orderForm[el].shouldValidate}
        changed={(event) => this.inputChangedHandler(event, el)} />;
    });
    let form = (
      <form onSubmit={this.orderConfirmedHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>CONFIRME</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateTpProps = state => {
  return {
    ings: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateTpProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));