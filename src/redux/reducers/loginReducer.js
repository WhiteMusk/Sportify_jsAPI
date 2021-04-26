import { LOG_IN, LOG_OUT } from '../actions';


const initialState = {
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  if (action.type === LOG_IN) {
    return { ...state, isLoggedIn: true};
  }
  else if (action.type === LOG_OUT) {
    return { ...state, isLoggedIn: false};
  }
  return state;
}


export default loginReducer;