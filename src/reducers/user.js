const initialState = { hasData: false, hasError: false, isLoading: false, data: null, type: null };

export default function user(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
  
    case "GET_AUTH":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "GET_AUTH_SUCCESS":
      return Object.assign({}, state, {
        data: action.data, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "GET_AUTH_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: false
      });
    case "GET_TYPE_USER":
      return Object.assign({}, state, {
        isLoading: true
      });
    case "GET_TYPE_USER_SUCCESS":
      return Object.assign({}, state, {
        type: action.data, 
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "GET_TYPE_USER_ERROR":
      return Object.assign({}, state, {
        hasError: true, 
        isLoading: false, 
        hasData: true
      });
    case 'AUTH_SESSION_CLEAR':
      return Object.assign({}, state, {
        data: {},
        hasError: false,
        hasData: false,
        isLoading: false,
        type: {},
      });
    default:
      return state;
  }
}