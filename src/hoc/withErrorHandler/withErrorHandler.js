import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount = () => {
      this.reqIntereceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.reqIntereceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });

    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqIntereceptor);
      axios.interceptors.response.eject(this.resIntereceptor);
    }

    render() {
      return (
        <Aux>
          <Modal
            hide={this.state.error}
            modalClosed={this.errorConfirmedHandler} >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;