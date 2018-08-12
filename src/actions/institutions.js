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

export const performGetInstitutions = () => (dispatch, getState, api) => {
  dispatch(getData('GET_INSTITUTIONS'));
  api.get_institutions().then((resp) => {
    console.log('resp de institutions' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK", dataInfo);
        dispatch(getDataSuccess(dataInfo, 'GET_INSTITUTIONS_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_INSTITUTIONS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_INSTITUTIONS_ERROR'));
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
