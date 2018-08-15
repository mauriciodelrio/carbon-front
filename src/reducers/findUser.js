const initialState = { hasData: false, hasError: false, isLoading: false, data: null, type: null };

export default function user(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "FIND_USER":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "FIND_USER_SUCCESS":
      return Object.assign({}, state, {
        data: action.data, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "FIND_USER_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
    default:
    return state;
  }
}