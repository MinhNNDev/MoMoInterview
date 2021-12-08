import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isSuccess, post} from '../../service/service';

export const AUTH_BEGIN = 'AUTH_BEGIN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authBegin = () => ({
  type: AUTH_BEGIN,
});

export const authSuccess = token => ({
  type: AUTH_SUCCESS,
  payload: {token},
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {error},
});

export const authAction = data => {
  return async dispatch => {
    try {
      dispatch(authBegin());
      // const {email, password} = data;
      // console.log('email:', email, 'password:', password);
      const res = await post('/login', data);
      console.log('Response: ', res.data);
      if (isSuccess(res.status)) {
        await AsyncStorage.setItem('tokenAuth', res.data.token);

        dispatch(authSuccess(res.data.token));
      }
    } catch (error) {
      dispatch(authFailure(error));
    }
  };
};
