import DashPageWrapper from '../../components/DashPageWrapper'
import UserForm from './userForm'
import ChangePasswordForm from './changePasswordForm'

function Profile() {
  return (
    <DashPageWrapper title='Profile'>
      <UserForm />
      <ChangePasswordForm />
    </DashPageWrapper>
  )
}

export default Profile