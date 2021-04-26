import { combineReducers } from 'redux';
import localeReducer from './localeReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    locale: localeReducer,
    auth: loginReducer
});

export default rootReducer;