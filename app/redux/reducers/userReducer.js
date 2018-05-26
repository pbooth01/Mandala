import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes.js';

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if(action){
        return action.userObj
      }
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}
