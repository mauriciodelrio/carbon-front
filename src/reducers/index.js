import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from "./user";
import institutions from "./institutions";
import departaments from "./departaments";
import careers from "./careers";
import currentCareer from "./currentCareer"
import courses from "./courses"

const getRootReducer = () => combineReducers({
  user,
  institutions,
  departaments,
  careers,
  courses,
  currentCareer,
  form: formReducer,
});  

export default getRootReducer;
