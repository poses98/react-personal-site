/**
 * @name Auth api endpoint connection
 * @description This class is intended to manage actions regarding tokens in client
 */

import { API_VERSION, BASE_PATH } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

/**
 * Returns access token if it is valid
 * @returns access token
 */
export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === 'null') {
    return null;
  }

  return isTokenExpired(accessToken) ? null : accessToken;
}
/**
 * Returns refresh token if it is valid
 * @returns refresh token
 */
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (refreshToken === 'null' || !refreshToken) {
    return null;
  }

  return isTokenExpired(refreshToken) ? null : refreshToken;
}
/**
 * Get new refresh and access token and stores'em into local storage
 * @param {*} refreshToken
 */
export function refreshAccessToken(refreshToken) {
  const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    header: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url, params)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
      return res.json();
    })
    .then((response) => {
      if (!response) {
        logout();
      } else {
        // Store new tokens
        const { accessToken, refreshToken } = response;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}
/**
 * Logout the user A.K.A. removing access tokens from local storage
 */
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

/**
 * Returns true if the token has expired and false if it's still valid
 * @param {*} token
 * @returns true if the token has expired and false if it's still valid
 */
function isTokenExpired(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { expires } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > expires;
}
