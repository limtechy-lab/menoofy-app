import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { selectCurrentToken } from "../features/auth/authSlice"
import { USER_TYPES } from '../constants/authConstant'

type decodedTypes = {
    id: string,
    role: number
}
const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let user;

    if (token) {
        const decoded: decodedTypes = jwtDecode(token)
        const { id, role } = decoded

        isAdmin = role === USER_TYPES.Admin

        if (isAdmin) user = "admin"

        return { id, role, user, isAdmin, }
    }

    return { id: null, role: null, isActive: false, isAdmin, user }
}
export default useAuth