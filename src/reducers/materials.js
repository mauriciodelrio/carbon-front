const initialState = { hasData: false, hasError: false, isLoading: false};

export default function careers(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "GET_MATERIALS":
      return { isLoading: true };
    case "GET_MATERIALS_SUCCESS":
      const data  = action.data;
      console.log("data reducer", data)
      return Object.assign({}, state, {
        [data.course_id]: data.materials,
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "GET_MATERIALS_ERROR":
      return { hasError: true, data: action.data, isLoading: false, hasData: false };
    default:
      return state;
  }
}