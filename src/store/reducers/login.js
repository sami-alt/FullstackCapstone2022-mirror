import { USER_ROLE } from 'store/constants'

const initialState = ''
const login = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_ROLE:
      return payload

    default:
      return state
  }
}

export default login
