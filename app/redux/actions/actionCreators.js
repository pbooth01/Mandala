import { LOGIN_USER, LOGOUT_USER } from './actionTypes.js';

export function loginUser(userObj) {
  return {
    type: LOGIN_USER,
    userObj
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}
