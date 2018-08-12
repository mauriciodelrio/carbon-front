const initialState = { hasData: false, hasError: false, isLoading: false};

export default function departaments(state = initialState, action) {
  switch (action.type) {
    // Indicate loading state without deleting previous data
    case "GET_DEPARTAMENTS":
      return { isLoading: true };
    case "GET_DEPARTAMENTS_SUCCESS":
      const data  = action.data;
      console.log("data reducer", data)
      return Object.assign({}, state, {
        [data.ins_id]: data.depts,
        hasError: false, 
        isLoading: false, 
        hasData: true
      });
    case "GET_DEPARTAMENTS_ERROR":
      return { hasError: true, data: action.data, isLoading: false, hasData: false };
    default:
      return state;
  }
}