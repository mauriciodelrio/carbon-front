import _ from 'lodash'; 
const initialState = { hasData: false, hasError: false, isLoading: false, data: [], type: null };

export default function user(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "LOAD_USER_CSV":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "LOAD_USER_CSV_SUCCESS":
      return Object.assign({}, state, {
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "LOAD_USER_CSV_ERROR":
      console.log("action errorrrr", action)
      let some = _.concat(state.data, [action.err]);
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: true,
        data: some

      });
    default:
    return state;
  }
}