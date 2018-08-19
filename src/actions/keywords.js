import _ from 'lodash';
import { push } from 'react-router-redux';

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

export const performGetKeywords = () => (dispatch, getState, api) => {
  dispatch(getData('GET_KEYWORDS'));
  api.get_keywords().then((resp) => {
    console.log('resp de keywords' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKKKKKKKKK", dataInfo);
        dispatch(getDataSuccess(dataInfo, 'GET_KEYWORDS_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_KEYWORDS_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_KEYWORDS_ERROR'));
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
