import initialState from './initialState';
import { LOGIN_SUCCESSFULL } from '../actions/type';

const authReducer = (state = initialState.auth, action) => {
  console.log(state);
  switch (action.type) {
    case LOGIN_SUCCESSFULL:
      return {
        ...state,
        user: action.user,
        is_logged_in: true,
        login_success: true,
        login_message: action.message
      }
    default:
      return state;
  }
}

export default authReducer;
