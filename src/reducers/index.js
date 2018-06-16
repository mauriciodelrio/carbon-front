import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from "./user";

const getRootReducer = () => combineReducers({
  user,
  form: formReducer,
});  

export default getRootReducer;
