import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from './authApiSlice'


function Logout({icon, className, title}) {

    const navigate = useNavigate()
    const [sendLogout, {
        // isLoading,
        // isSuccess,
        // isError,
        // error
    }] = useSendLogoutMutation()

    // if (isSuccess) navigate('/login')
    // if (isLoading) return <Spinner message={"Logging out..."} />

  // if (isLoading) {
  //   return (
  //       <div className=" h-screen w-screen flex justify-center items-center">
  //       <span className="loader"></span>
  //       </div>
  //   )
  // }

  return (
    <button className={className}
        onClick={ sendLogout }
    >
      {icon}
      {title}
    </button>
  )
}

export default Logout