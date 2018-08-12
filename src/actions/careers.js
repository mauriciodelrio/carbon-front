import _ from 'lodash';
import { push } from 'react-router-redux';
import { setAccessKeys, deleteAccessKeys } from '../lib/storage';
import { accentsTidy, wordsTidy } from '../lib/lib';

export const getData = (type, data = {}) => ({
  type,
  data,
});

export const getDataSuccess = (data, type) => ({
  data,
  type,
});

export const getDataFailure = (err, type) => ({
  err,
  type,
});

export const performGetCareersByDepartament = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_CAREERS'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy carreeeers', payload);
  api.get_careers_by_departament(payload).then((resp) => {
    console.log('resp de careers' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK careers", dataInfo);
        dispatch(getDataSuccess({dept_id: payload, careers: dataInfo}, 'GET_CAREERS_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_CAREERS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_CAREERS_ERROR'));
  });
}

export const performCareerById = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_CAREER_BY_ID'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy carreeeer id', payload);
  api.get_career_by_id(payload).then((resp) => {
    console.log('resp career' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKK career by id", dataInfo);
        dispatch(getDataSuccess(dataInfo, 'GET_CAREER_BY_ID_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_CAREER_BY_ID_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_CAREERS_ERROR'));
  });
}

export const performGetCoursesByCareer = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_COURSES'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy courses', payload);
  api.get_courses_by_career(payload).then((resp) => {
    console.log('resp de courses' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK courses", dataInfo);
        dispatch(getDataSuccess({career_id: payload, courses: dataInfo}, 'GET_COURSES_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_CAREERS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_CAREERS_ERROR'));
  });
}

export const goToRoute = (route, id = '', payload = {}) => (dispatch) => {
  dispatch(push(`/${route}/${id}`, payload));
};

export const goToSearch = (route, id = '') => (dispatch) => {
  dispatch(push(`/${route}?q=${id}`));
};

export const goToIndex = () => (dispatch) => {
  dispatch(push('/'));
};
