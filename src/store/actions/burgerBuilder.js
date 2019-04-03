import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingNam) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingNam
  };
};

export const removeIngredient = (ingNam) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingNam
  };
};

export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios.get('https://react-my-burger-d046e.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};