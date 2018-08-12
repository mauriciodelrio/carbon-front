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

export const performGetDepartamentsByInstitution = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_DEPARTAMENTS'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy', payload);
  api.get_departaments_by_institution(payload).then((resp) => {
    console.log('resp de departaments' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK deep", dataInfo);
        dispatch(getDataSuccess({ins_id: payload, depts: dataInfo}, 'GET_DEPARTAMENTS_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_DEPARTAMENTS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_DEPARTAMENTS_ERROR'));
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
