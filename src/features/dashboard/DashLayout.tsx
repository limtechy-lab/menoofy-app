import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import TopBar from "./TopBar"
import { selectCurrentUser } from "../auth/authSlice"

const DashLayout = () => {

  const user = useSelector(selectCurrentUser)

  const { isStoreAdded } = user

  return(
    <>
      <TopBar />
      <div className=" md:px-8">
        {isStoreAdded 
          ? <Outlet />
          : <Navigate to="/onboarding" replace />
        }
      </div>
    </>
  )   
}

export default DashLayout