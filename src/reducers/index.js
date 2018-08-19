import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from "./user";
import institutions from "./institutions";
import categories from "./categories";
import types from "./types";
import keywords from "./keywords";
import departaments from "./departaments";
import careers from "./careers";
import materials from "./materials";
import currentCareer from "./currentCareer"
import currentCourse from "./currentCourse"
import currentMaterial from "./currentMaterial"
import courses from "./courses"
import findUser from "./findUser"
import findMaterials from "./findMaterials"
import userError from "./userError"
const getRootReducer = () => combineReducers({
  user,
  institutions,
  categories,
  types,
  keywords,
  findMaterials,
  departaments,
  careers,
  courses,
  materials,
  currentCareer,
  currentCourse,
  currentMaterial,
  findUser,
  userError,
  form: formReducer,
});  

export default getRootReducer;
