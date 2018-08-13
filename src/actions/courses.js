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

export const performGetMaterialsByCourse = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_MATERIALS'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy course', payload);
  api.get_materials_by_course(payload).then((resp) => {
    console.log('resp de materials' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK materials", dataInfo);
        dispatch(getDataSuccess({course_id: payload, materials: dataInfo}, 'GET_MATERIALS_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_MATERIALS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_MATERIALS_ERROR'));
  });
}

export const performCourseById = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_COURSE_BY_ID'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy course id', payload);
  api.get_course_by_id(payload).then((resp) => {
    console.log('resp course' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKK course by id", dataInfo);
        dispatch(getDataSuccess(dataInfo, 'GET_COURSE_BY_ID_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_COURSE_BY_ID_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_COURSE_BY_ID_ERROR'));
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
