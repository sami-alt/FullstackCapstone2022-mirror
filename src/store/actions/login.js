import { loginRequest } from 'api/user'
import { removeToken, setToken } from 'utils/token'
import { USER_ROLE } from 'store/constants'

export const loginAction = (username, password) => {
  return async (dispatch) => {
    const res = await loginRequest(username, password)
    console.log(res)
    const { realName, Token } = res
    setToken(Token)

    dispatch({
      type: USER_ROLE,
      payload: realName,
    })
  }
}

export const logoutAction = () => {
  return (dispatch) => {
    removeToken()
  }
}
