import { SET_LOCALE } from "./action-types";

export const setLocale = (newLocale) => {
    return { type: SET_LOCALE, newLocale };
};