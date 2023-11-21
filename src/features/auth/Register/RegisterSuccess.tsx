import { MailCheck } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type args = {
  email: string
}
function RegisterSuccess({email}: args) {
  return (
    <Alert>
      <MailCheck className="h-4 w-4" />
      <AlertTitle>Congratulation!</AlertTitle>
      <AlertDescription>
        <p>
          Thank you for joining us.👏 <br />
          An email verification link have been sent to {email}, kindly check and verify your email.
        </p>&nbsp; &nbsp;
      </AlertDescription>
    </Alert>
  )
}

export default RegisterSuccess