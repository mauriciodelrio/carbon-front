import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from "./user";
import institutions from "./institutions";

const getRootReducer = () => combineReducers({
  user,
  institutions,
  form: formReducer,
});  

export default getRootReducer;
