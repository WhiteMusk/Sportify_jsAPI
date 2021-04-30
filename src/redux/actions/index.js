// Action Types
export const SET_LOCALE = "locale/SET_LOCALE";
export const LOG_IN = "login/LOG_IN";
export const LOG_OUT = "logout/LOG_OUT";


// Action Creators
export const setLocale = (newLocale) => {
    return { type: SET_LOCALE, newLocale };
};

export const logIn = (payload) => {
    return { type: LOG_IN, payload };
};

export const logOut = () => {
    return { type: LOG_OUT };
}