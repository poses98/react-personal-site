//Conexion endpoints usuario
import { BASE_PATH, API_VERSION } from './config';

export function signUpApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
  const params = {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, params)
    .then((res) => res.json())
    .catch((err) => {
      return { ok: false, message: err.message };
    })
    .then((response) => {
      if (response.user) {
        return {
          ok: true,
          message: 'Usuario creado correctamente',
        };
      }
      return { ok: false, message: response.message };
    });
}
