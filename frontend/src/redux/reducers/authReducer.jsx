const initialState = {
  user: null,
  errorMessage: null,
};

//reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, errorMessage: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
