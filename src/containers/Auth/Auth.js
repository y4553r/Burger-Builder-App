import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address..'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'Password',
          placeholder: 'Password...'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAutoRedirectPath('/');
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  }

  render() {
    let formElements = Object.keys(this.state.controls).map(el => {
      return <Input
        key={el}
        valueType={el}
        elementType={this.state.controls[el].elementType}
        elementConfig={this.state.controls[el].elementConfig}
        value={this.state.controls[el].value}
        invalid={!this.state.controls[el].valid}
        shouldValidate={this.state.controls[el].touched}
        changed={(event) => this.inputChangedHandler(event, el)} />;
    });

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElements}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    let errorMessage = null;
    if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;

    let authRedirect = null;
    if (this.props.token) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={styles.Auth}>
        <div>
          <h1>Login</h1>
          {this.props.loading ? <Spinner /> : form}
          {authRedirect}
          {errorMessage}
          <Button
            btnType="Danger"
            clicked={this.switchAuthModeHandler} >
            SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    building: state.burgerbuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAutoRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);