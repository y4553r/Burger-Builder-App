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

	render() {
		console.log(this.props.ings, this.props.price);
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
					{orderSummary}
				</Modal>
				<Burger ingredients={this.props.ings} />
				<BuildControls
					ingredients={this.props.ings}
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					price={this.props.price}
					purchasable={this.updatePurchaseState(this.props.ings)}
					clicked={this.toggleOrderSummaryHandler} />
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
		purchasable: state.order.purchasable
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch( actions.addIngredient(ingName) ),
		onIngredientRemoved: (ingName) => dispatch( actions.removeIngredient(ingName) ),
		onInitIngredients: () => dispatch( actions.initIngredient() ),
		onPurchaseInit: () => dispatch(actions.purchaseInit())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));