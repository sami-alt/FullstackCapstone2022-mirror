const TOKEN_KEY = 'tesy_pc'

// retrieve token
export const getToken = () => localStorage.getItem(TOKEN_KEY)
// save token
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
// remove token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
// there is a token or not
export const hasToken = () => !!getToken()
