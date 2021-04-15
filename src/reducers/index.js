// import { ADD_ARTICLE } from "../constants/action-types";
import { combineReducers } from 'redux';
import localeReducer from './localeReducer';

const rootReducer = combineReducers({
    locale: localeReducer
});

export default rootReducer;