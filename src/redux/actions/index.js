// Action Types
export const SET_LOCALE = "locale/SET_LOCALE";


// Action Creators
export const setLocale = (newLocale) => {
    return { type: SET_LOCALE, newLocale };
};