import { useSelector } from 'react-redux'

export const useRightsCheck = (wantedUserRight) => {
    const userRights = useSelector((state) => state.login)
    return userRights.some(_ => _.authority === wantedUserRight)
}
