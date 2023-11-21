import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../auth/authSlice"

const OnboardingLayout = () => {
  const user = useSelector(selectCurrentUser)

  const { isStoreAdded } = user

  const content = (
    !isStoreAdded
    ? <Outlet />
    : <Navigate to="/dashboard" replace />
)

return content
}

export default OnboardingLayout