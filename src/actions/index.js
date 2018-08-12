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

export const performLogin = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_AUTH'));
  api.login(payload).then((resp) => {
    console.log('resp de login' , resp);
    const { status = 400 } = resp.data;
    const dataInfo = resp.data.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK", dataInfo);
        setAccessKeys(_.get(dataInfo, 'user.user_id'), {});
        dispatch(getDataSuccess(dataInfo, 'GET_AUTH_SUCCESS'));
        dispatch(push('/home'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_AUTH_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_AUTH_ERROR'));
  });
};

export const performCreateUser = (payload) => (dispatch, getState, api) => {
  console.log("params create user aaa", payload)
};

export const performGetTypeUser = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_TYPE_USER'));
  api.user_type(payload).then((resp) =>{
    console.log("tipo de usuariooo", resp);
    dispatch(getDataSuccess(resp.data.data, 'GET_TYPE_USER_SUCCESS'));
  }).catch((err) => {
    console.log(err);
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_TYPE_USER_ERROR'));
  })
}

export const setAccount = (payload) => (dispatch, getState, api) => {
  api.updateAccount(payload).then((resp) => {
    const { status = 400 } = resp;
    switch (status) {
      case 200:
      {
        dispatch(push('/cuenta'));
        break;
      }
      default:
        dispatch(push('/error'));
        break;
    }
  }).catch((err) => {
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'POST_ACCOUNT_ERROR'));
  });
};

export const performLogout = () => (dispatch, getState, api) => {
  api.logout().then(() => {
    dispatch(getData('AUTH_SESSION_CLEAR'));
    dispatch(push('/login'));
  }).catch((err) => console.log(err));
};

export const goToRoute = (route, id = '', payload = {}) => (dispatch) => {
  dispatch(push(`/${route}/${id}`, payload));
};

export const goToSearch = (route, id = '') => (dispatch) => {
  dispatch(push(`/${route}?q=${id}`));
};

export const goToIndex = () => (dispatch) => {
  dispatch(push('/'));
};
