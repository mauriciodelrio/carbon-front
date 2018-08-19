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

export const performSearchMaterial = (payload) => (dispatch, getState, api) => {
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy material search', payload);
  dispatch(getData('SEARCH_MATERIAL'));
  if(payload.word) {
    dispatch(getData('SEARCH_MATERIAL_BY_WORD'));
    api.get_material_by_string(payload.word).then((resp) => {
    console.log('resp material by string' , resp);
      const { status = 400 } = resp;
      const dataInfo = resp.data;
      console.log(status, typeof status);
      switch (status) {
        case 'OK':
        {
          console.log("entro en OKKKK material by id", dataInfo);
          dispatch(getDataSuccess(dataInfo, 'SEARCH_MATERIAL_BY_WORD_SUCCESS'));
          break;
        }
        default:
        {
          console.log("entro a default", resp);
          dispatch(getDataFailure({ status }, 'SEARCH_MATERIAL_BY_WORD_ERROR'));
          break;
        }
      }
    }).catch((err) => {
      console.log("err", err)
      dispatch(getDataFailure(_.get(err, 'response.data', {}), 'SEARCH_MATERIAL_BY_WORD_ERROR'));
    });
  }
  if(payload.category) {
    dispatch(getData('SEARCH_MATERIAL_BY_CATEGORY'));
    api.get_material_by_category(payload.category).then((resp) => {
      console.log('resp material by category' , resp);
      const { status = 400 } = resp;
      const dataInfo = resp.data;
      console.log(status, typeof status);
      switch (status) {
        case 'OK':
        {
          console.log("entro en OKKKK material by id", dataInfo);
          dispatch(getDataSuccess(dataInfo, 'SEARCH_MATERIAL_BY_CATEGORY_SUCCESS'));
          break;
        }
        default:
        {
          console.log("entro a default", resp);
          dispatch(getDataFailure({ status }, 'SEARCH_MATERIAL_BY_CATEGORY_ERROR'));
          break;
        }
      }
    }).catch((err) => {
      console.log("err", err)
      dispatch(getDataFailure(_.get(err, 'response.data', {}), 'SEARCH_MATERIAL_BY_CATEGORY_ERROR'));
    });
  }
  if(payload.type) {
    dispatch(getData('SEARCH_MATERIAL_BY_TYPE'));
    api.get_material_by_category(payload.type).then((resp) => {
      console.log('resp material by type' , resp);
      const { status = 400 } = resp;
      const dataInfo = resp.data;
      console.log(status, typeof status);
      switch (status) {
        case 'OK':
        {
          console.log("entro en OKKKK material by id", dataInfo);
          dispatch(getDataSuccess(dataInfo, 'SEARCH_MATERIAL_BY_TYPE_SUCCESS'));
          break;
        }
        default:
        {
          console.log("entro a default", resp);
          dispatch(getDataFailure({ status }, 'SEARCH_MATERIAL_BY_TYPE_ERROR'));
          break;
        }
      }
    }).catch((err) => {
      console.log("err", err)
      dispatch(getDataFailure(_.get(err, 'response.data', {}), 'SEARCH_MATERIAL_BY_TYPE_ERROR'));
    });
  }
  if(payload.keyword) {
    dispatch(getData('SEARCH_MATERIAL_BY_KEYWORD'));
    api.get_material_by_category(payload.keyword).then((resp) => {
      console.log('resp material by keyword' , resp);
      const { status = 400 } = resp;
      const dataInfo = resp.data;
      console.log(status, typeof status);
      switch (status) {
        case 'OK':
        {
          console.log("entro en OKKKK material by id", dataInfo);
          dispatch(getDataSuccess(dataInfo, 'SEARCH_MATERIAL_BY_KEYWORD_SUCCESS'));
          break;
        }
        default:
        {
          console.log("entro a default", resp);
          dispatch(getDataFailure({ status }, 'SEARCH_MATERIAL_BY_KEYWORD_ERROR'));
          break;
        }
      }
    }).catch((err) => {
      console.log("err", err)
      dispatch(getDataFailure(_.get(err, 'response.data', {}), 'SEARCH_MATERIAL_BY_KEYWORD_ERROR'));
    });
  }
}


export const performMaterialById = (payload) => (dispatch, getState, api) => {
  dispatch(getData('GET_MATERIAL_BY_ID'));
  console.log('paaaaaaaaaaaayyyyyyyyyyyyyyyyyyyy material id', payload);
  api.get_material_by_id(payload).then((resp) => {
    console.log('resp material' , resp);
    const { status = 400 } = resp;
    const dataInfo = resp.data;
    console.log(status, typeof status);
    switch (status) {
      case 'OK':
      {
        console.log("entro en OKKKK material by id", dataInfo);
        dispatch(getDataSuccess(dataInfo, 'GET_MATERIAL_BY_ID_SUCCESS'));
        break;
      }
      default:
      {
        console.log("entro a default", resp);
        dispatch(getDataFailure({ status }, 'GET_MATERIAL_BY_ID_ERROR'));
        break;
      }
    }
  }).catch((err) => {
    console.log("err", err)
    dispatch(getDataFailure(_.get(err, 'response.data', {}), 'GET_MATERIAL_BY_ID_ERROR'));
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
