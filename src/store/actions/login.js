import { loginRequest } from 'api/user'
import { setToken, removeToken } from 'utils/token'
import { USER_ROLE } from 'store/constants'

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const res = await loginRequest(email, password)
    //console.log(res)
    //const { accessToken, user } = res
    //setToken(accessToken)
    console.log(res.headers.authorization)
    const user = res.data.username
    console.log(user)
    setToken(res.headers.authorization)

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
