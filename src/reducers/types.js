const initialState = { hasData: false, hasError: false, isLoading: false, data: null };

export default function types(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "GET_TYPES":
      return { isLoading: true };
    case "GET_TYPES_SUCCESS":
      const data  = action.data;
      console.log("data reducer", data)
      return { hasData: true, hasError: false, isLoading: false, data };
    case "GET_TYPES_ERROR":
      return { hasError: true, data: action.data, isLoading: false, hasData: false };
    default:
      return state;
  }
}