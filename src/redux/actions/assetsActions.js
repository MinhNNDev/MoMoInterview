import axios from 'axios';

export const ASSETS_BEGIN = 'ASSETS_BEGIN';
export const ASSETS_SUCCESS = 'ASSETS_SUCCESS';
export const ASSETS_FAILURE = 'ASSETS_FAILURE';

export const getAssetsBegin = () => ({
  type: ASSETS_BEGIN,
});

export const getAssetsSuccess = assets => ({
  type: ASSETS_SUCCESS,
  payload: {assets},
});

export const getAssetsFailure = error => ({
  type: ASSETS_FAILURE,
  payload: {error},
});

export const getAssets = () => {
  return dispatch => {
    dispatch(getAssetsBegin());
    let apiURL = `https://jsonplaceholder.typicode.com/photos`;

    return axios({
      url: apiURL,
      method: 'GET',
      headers: {
        Accept: 'Application/json',
      },
    })
      .then(res => {
        // console.log(' Assets: ', res.data);
        if (res.status === 200) {
          dispatch(getAssetsSuccess(res.data));
        } else {
          dispatch(getAssetsFailure(res.data));
        }
      })
      .catch(error => {
        dispatch(getAssetsFailure(error));
      });
  };
};
