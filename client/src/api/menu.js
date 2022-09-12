import { BASE_PATH, API_VERSION } from './config';

export async function getMenusApi(token) {
  const url = `${BASE_PATH}/${API_VERSION}/get-menus`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
