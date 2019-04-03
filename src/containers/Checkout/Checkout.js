import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  cancelOrderHandler = () => {
    this.props.history.push('/burger-builder');
  }

  continueOrderHandler = () => {
    this.props.history.push(this.props.match.url + '/contact/');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            continue={this.continueOrderHandler}
            cancel={this.cancelOrderHandler} />
          <Route path={this.props.match.url + '/contact/'}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerbuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);