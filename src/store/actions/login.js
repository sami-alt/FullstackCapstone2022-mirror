import { loginRequest } from 'api/user'

export const loginAction = (email, password) => {
  return async (dispatch) => {
    const res = await loginRequest(email, password)
    console.log(res)
  }
}
