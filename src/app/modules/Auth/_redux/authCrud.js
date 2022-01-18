import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

const instance = axios.create();

export function login(username, password) {
  var params = {
    grant_type: 'password',
    UserName: '',
    Password: '',
    client_id: 'mobifone-web'
  };
  params.UserName = username;
  params.Password = password;
  // return instance.post(LOGIN_URL, qs.stringify(params));
  // return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
