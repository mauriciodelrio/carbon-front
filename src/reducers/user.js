const initialState = { hasData: false, hasError: false, isLoading: false, data: null };

export default function areas(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "GET_AUTH":
      return { isLoading: true };
    case "GET_AUTH_SUCCESS":
      const data  = action.data;
      return { hasData: true, hasError: false, isLoading: false, data };
    case "GET_AUTH_ERROR":
      return { hasError: true, data: action.data, isLoading: false, hasData: false };
    default:
      return state;
  }
}