import { USER_INFO } from 'store/constants'

const initialState = ''
const login = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_INFO:
      return payload

    default:
      return state
  }
}

export default login
