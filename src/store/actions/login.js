import { loginRequest } from 'api/user'
import { setToken, removeToken } from 'utils/token'
import { USER_ROLE } from 'store/constants'

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const res = await loginRequest(email, password)
    console.log(res)
    const { accessToken, user } = res
    setToken(accessToken)

    dispatch({
      type: USER_ROLE,
      payload: user,
    })
  }
}

export const logoutAction = () => {
  return (dispatch) => {
    removeToken()
  }
}
