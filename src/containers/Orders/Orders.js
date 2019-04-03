import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrdersStart(this.props.token);
  }

  render() {
    let orders = this.props.orders.map(order => {
      return <Order 
      key={order.key}
      ingredients={order.ingredients}
      costumar={order.costumar}
      price={order.price} />
    });
    if (this.props.displayingOrders) orders = <Spinner />
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    displayingOrders: state.order.displayingOrders,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrdersStart: (token) => dispatch(actions.fetchOrdersStart(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));