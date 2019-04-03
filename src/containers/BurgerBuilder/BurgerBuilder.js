import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';

class BurgerBuilder extends Component {
	state = {
		showOrderSummary: false,
	}

	componentDidMount = () => {
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ings) => {
		const sum = Object.keys(ings).map(ing => ings[ing]).reduce((acc, cur) => acc + cur);
		return sum === 0 ? false : true;
	}

	toggleOrderSummaryHandler = () => {
		this.setState({ showOrderSummary: !this.state.showOrderSummary });
	}

	purchaseCancelHandler = () => {
		this.setState({ showOrderSummary: false });
	}

	purchaseContinueHandler = () => {
		this.props.onPurchaseInit();
		this.props.history.push('/checkout');
	}

	authRedirectionHandler = () => {
		if(!this.props.isAuth) {
			this.props.onSetAutoRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	render() {
		let loginPopup = (
			<React.Fragment>
				<p>You need to login in order to see order this sweet burger :D</p>
				<Button btnType="Success" clicked={this.authRedirectionHandler} disabled={false} >Login/Sign up</Button>
			</React.Fragment>
		);
		let orderSummary = (
			<OrderSummary
				price={this.props.price}
				ingredients={this.props.ings}
				purchaseCancel={this.purchaseCancelHandler}
				purchaseContinue={this.purchaseContinueHandler} />
		);
		let burger = this.props.err ? <h1>Ingredients can not be loaded</h1> : <Spinner />;
		if (this.props.ings) burger = (
			<Aux>
				<Modal hide={this.state.showOrderSummary} modalClosed={this.purchaseCancelHandler}>
					{this.props.isAuth ? orderSummary : loginPopup}
				</Modal>
				<Burger ingredients={this.props.ings} />
				<BuildControls
					ingredients={this.props.ings}
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					price={this.props.price}
					purchasable={this.updatePurchaseState(this.props.ings)}
					clicked={this.toggleOrderSummaryHandler}
					isAuth={this.props.isAuth} />
			</Aux>
		);
		return (
			<Aux>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerbuilder.ingredients,
		price: state.burgerbuilder.totalPrice,
		err: state.burgerbuilder.error,
		purchasable: state.order.purchasable,
		isAuth: state.auth.token !== null,
		path: state.auth.path
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredient()),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetAutoRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));