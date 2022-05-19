import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessToken,
  logout,
} from '../api/auth';

export const AuthContext = createContext();

/**
 * This function executes in every page of our webapp
 * @param {*} props
 * @returns
 */
export default function AuthProvider(props) {
  //Children is full web app
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  console.log(user);

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
  //Get accessToken
  const accessToken = getAccessTokenApi();
  //Checking if it is not valid
  if (!accessToken) {
    //If it is not valid get refreshToken
    const refreshToken = getRefreshTokenApi();
    //Checking if refreshToken is not valid
    if (!refreshToken) {
      //If it is not valid logout the user AKA -> delete tokens from localStorage
      logout();
      /*
       * Set user to null and loading to false so that page loads correctly
       * this means user will have to login again to get a new pair of keys, as he has lost them... in the party?
       */
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      //If there is an alive refresh token then get new access token and some coffee for me and let me in please, Sir
      refreshAccessToken();
    }
  } else {
    //If access token is valid
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
