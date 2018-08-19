import _ from 'lodash'; 
const initialState = { hasData: false, hasError: false, isLoading: false, data: [], type: null };

export default function user(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "SEARCH_MATERIAL":
      return Object.assign({}, state, {
        data: []
      });
    case "SEARCH_MATERIAL_BY_WORD":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "SEARCH_MATERIAL_BY_WORD_SUCCESS":
      let word = _.concat(state.data, action.data);
      return Object.assign({}, state, {
        data: word, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "SEARCH_MATERIAL_BY_WORD_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
    case "SEARCH_MATERIAL_BY_CATEGORY":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "SEARCH_MATERIAL_BY_CATEGORY_SUCCESS":
      let cat = _.concat(state.data, action.data);
      return Object.assign({}, state, {
        data: cat, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "SEARCH_MATERIAL_BY_CATEGORY_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
      case "SEARCH_MATERIAL_BY_TYPE":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "SEARCH_MATERIAL_BY_TYPE_SUCCESS":
      let ty = _.concat(state.data, action.data);
      return Object.assign({}, state, {
        data: ty, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "SEARCH_MATERIAL_BY_TYPE_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
      case "SEARCH_MATERIAL_BY_KEYWORD":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "SEARCH_MATERIAL_BY_KEYWORD_SUCCESS":
      let kw = _.concat(state.data, action.data);
      return Object.assign({}, state, {
        data: kw, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "SEARCH_MATERIAL_BY_KEYWORD_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
    default:
    return state;
  }
}