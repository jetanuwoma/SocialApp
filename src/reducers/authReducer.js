import initialState from './initialState';
import { LOGIN_SUCCESSFULL } from '../actions/type';

const authReducer = (state = initialState.auth, action) => {
  console.log(action, 'I am here again');
  switch (action.type) {
    case LOGIN_SUCCESSFULL:
      return {
        ...state,
        user: action.data.user,
        is_logged_in: true,
        login_success: true
      }
    default:
      return state;
  }
}

export default authReducer;
