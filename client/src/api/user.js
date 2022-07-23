//Conexion endpoints usuario
import { BASE_PATH, API_VERSION } from "./config";

export async function signUpApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
  const params = {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
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
          message: "Usuario creado correctamente",
        };
      }
      return { ok: false, message: response.message };
    });
}

export async function signInApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((res) => res.json())
    .catch((err) => {
      return { ok: false, message: err.message };
    })
    .then((response) => {
      return response;
    });
}

export async function getUsersApi(token) {
  const url = `${BASE_PATH}/${API_VERSION}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => response)
    .catch((err) => {
      return { ok: false, message: err.message };
    })
    .then((result) => {
      return result;
    });
}

export async function getUsersActiveApi(token, status) {
  const url = `${BASE_PATH}/${API_VERSION}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((err) => {
      return { ok: false, message: err.message };
    })
    .then((result) => {
      return result;
    });
}
