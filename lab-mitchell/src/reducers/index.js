import expenseReducer from './expense';
import categoryReducer from './category';
import {combineReducers} from 'redux';
import category from './category';

export default combineReducers({
  expenses: expenseReducer,
  categories: categoryReducer,
});