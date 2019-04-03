import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/burger-builder' component={BurgerBuilder} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Redirect from='/' to='/burger-builder' />
          </Switch>
          {/* <BurgerBuilder />
            <Checkout /> */}
        </Layout>
        <p hidden>cnrd*1928</p>
      </div>
    );
  }
}

export default App;
