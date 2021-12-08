import {
    AUTH_BEGIN,
    AUTH_SUCCESS,
    AUTH_FAILURE,
  } from '../actions/authActions';
  
  const initialState = {
    error: null,
    loading: false,
    token: '',
  };
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case AUTH_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
        };
      case AUTH_FAILURE:
        return {
          ...state,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default auth;