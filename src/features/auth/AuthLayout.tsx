import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Header from "./header"
const AuthLayout = () => {
  const { role, user } = useAuth();

  const content = (
    !role || !user
    ? 
    <div className=" space-y-6">
      <Header />
      <Outlet />
    </div>
    : <Navigate to="/dashboard" replace />
)

return content
}

export default AuthLayout