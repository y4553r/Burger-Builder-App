import React, { Component } from 'react';

import styles from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.hide !== this.props.hide || nextProps.children !== this.props.children);
  }

  componentWillUpdate() {
    
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.hide} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.hide ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.hide ? '1' : '0'
          }} >
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default Modal;