import { combineReducers } from 'redux';
import localeReducer from './localeReducer';

const rootReducer = combineReducers({
    locale: localeReducer
});

export default rootReducer;