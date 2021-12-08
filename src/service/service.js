import axios from 'axios';

const URL_LOGIN = 'https://reqres.in/api';

export const isSuccess = statusCode => {
  const successStatusCodes = [200, 201, 204];
  if (successStatusCodes.includes(statusCode)) {
    return true;
  }
  return false;
};

function getHeaderWithoutBearer() {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header;
}

async function getHeaderWithToken() {
  const token = await AsyncStorage.getItem('tokenAuth');
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return header;
}

export const get = async url => {
  return await axios
    .get(BASE_URL + url, {
      headers: await getHeaderWithToken(),
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error?.response) {
        return error?.response;
      }
      return {status: 400};
    });
};

export const post = async (url, data) => {
  return await axios
    .post(URL_LOGIN + url, data, {
      headers: await getHeaderWithoutBearer(),
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error?.response) {
        return error?.response;
      }
      return error;
    });
};
