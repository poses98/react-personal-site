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

export async function getActiveMenusApi() {
  const url = `${BASE_PATH}/${API_VERSION}/get-active-menus`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

export function updateMenuApi(token, menuId, data) {
  const url = `${BASE_PATH}/${API_VERSION}/update-menu/${menuId}`;
  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

export function activateMenuApi(token, menuId, status) {
  const url = `${BASE_PATH}/${API_VERSION}/activate-menu/${menuId}`;

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

export function addMenuApi(token, data) {
  const url = `${BASE_PATH}/${API_VERSION}/add-menu`;

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteMenuApi(token, menuId) {
  const url = `${BASE_PATH}/${API_VERSION}/delete-menu/${menuId}`;

  const params = {
    method: 'DELETE',
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
      return err;
    });
}
