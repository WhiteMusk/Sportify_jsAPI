import { LOG_IN, LOG_OUT } from '../actions';


const initialState = {
  isLoggedIn: false,
  userData: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      console.log(action.payload);
      return { ...state, isLoggedIn: true, userData: action.payload};;
    case LOG_OUT:
      return { ...state, isLoggedIn: false, userData: null};;
    default:
      return state;
  }
}

export default authReducer;