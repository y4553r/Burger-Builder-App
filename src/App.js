import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/burger-builder' component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect from='/' to='/burger-builder' />
      </Switch>
    );
    
    if (this.props.isAuth) {
      routes = (<Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/logout' component={Logout} />
        <Route path='/orders' component={Orders} />
        <Route path='/burger-builder' component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect from='/' to='/burger-builder' />
      </Switch>)
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
