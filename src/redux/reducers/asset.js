import {
  ASSETS_BEGIN,
  ASSETS_SUCCESS,
  ASSETS_FAILURE,
} from '../actions/assetsActions';

const initialState = {
  assets: [],
  error: null,
  loading: false,
};

const asset = (state = initialState, action) => {
  switch (action.type) {
    case ASSETS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload.assets,
      };
    case ASSETS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default asset;
