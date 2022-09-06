//Conexion endpoints usuario
import { BASE_PATH, API_VERSION } from './config';

export async function signUpApi(data) {
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

export async function signInApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
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
      return response;
    });
}

export async function getUsersApi(token) {
  const url = `${BASE_PATH}/${API_VERSION}/users`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

export async function uploadAvatarApi(token, avatar, userId) {
  const url = `${BASE_PATH}/${API_VERSION}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append('avatarName', avatar, avatar.name);

  const params = {
    method: 'PUT',
    body: formData,
    headers: {
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

export async function getAvatarApi(avatarName) {
  const url = `${BASE_PATH}/${API_VERSION}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export async function updateUserApi(token, user, userId) {
  const url = `${BASE_PATH}/${API_VERSION}/update-user/${userId}`;

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(user),
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

export async function activateUserApi(token, status, userId) {
  const url = `${BASE_PATH}/${API_VERSION}/activate-user/${userId}`;

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
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
