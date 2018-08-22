const initialState = { hasData: false, hasError: false, isLoading: false, data: null};

export default function materials(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "GET_ALL_MATERIALS":
      return { isLoading: true };
    case "GET_ALL_MATERIALS_SUCCESS":
      return Object.assign({}, state, {
        data: action.data,
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "GET_ALL_MATERIALS_ERROR":
      return { hasError: true, data: action.data, isLoading: false, hasData: false };
    default:
      return state;
  }
}