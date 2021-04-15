import { SET_LOCALE } from "../actions/actionTypes";
import en from '../i18n/en.js';
import zh from '../i18n/zh.js';

const initialState = {
  locale: navigator.language,
  messages: navigator.language.includes('zh') ? zh : en
};

const localeReducer = (state = initialState, action) => {
  if (action.type === SET_LOCALE) {
    return { ...state, locale: action.payload, messages: (action.payload.includes('zh') ? zh : en)};
  }
  return state;
}

export default localeReducer;