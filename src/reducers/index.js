import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from "./user";
import institutions from "./institutions";
import departaments from "./departaments";
import careers from "./careers";
import materials from "./materials";
import currentCareer from "./currentCareer"
import currentCourse from "./currentCourse"
import courses from "./courses"

const getRootReducer = () => combineReducers({
  user,
  institutions,
  departaments,
  careers,
  courses,
  materials,
  currentCareer,
  currentCourse,
  form: formReducer,
});  

export default getRootReducer;
