import client from '../utils/client';
import { LOGIN_SUCCESSFULL, LOGIN_FAILED, LOGIN_USER } from './type';

export function loginUserSuccessful(data) {
  return {
    type: LOGIN_SUCCESSFULL,
    data
  }
}

export function loginUserFailed(data) {
  return {
    type: LOGIN_FAILED,
    data
  }
}

export function loginUser(username, password) {
  return client.post('/users/login', {username, password});
}