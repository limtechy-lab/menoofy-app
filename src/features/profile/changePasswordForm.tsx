import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useChangePasswordMutation } from "./userApiSlice"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const changePasswordFormSchema = z.object({
    oldPassword: z.string().nonempty('Field is required'),
    newPassword: z.string()
        .nonempty('Field is required')
        .min(8, 'Must be more than 8 characters long')
        .refine((value) => /[0-9]/.test(value), 'Password requires a number')
        .refine((value) => /[a-z]/.test(value), 'Password requires a lowercase letter')
        .refine((value) => /[A-Z]/.test(value), 'Password requires an uppercase letter')
        .refine((value) => /[^\w]/.test(value), 'Password requires a symbol'),
    confirm_password: z.string(),
}).refine((data) => data.newPassword === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>

const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirm_password: '',
}

function ChangePasswordForm() {

    const { toast } = useToast()
    const [changePassword, {isLoading}] = useChangePasswordMutation()

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues,
        mode: "onChange",
    })
    
    async function onSubmit(data: ChangePasswordFormValues) {
        console.log(data)
        //     const data = JSON.stringify(data, null, 2)
        // try {
        //   const dataToUpdate = {
        //     oldPassword: data.oldPassword,
        //     newPassword: data.newPassword,
        //   }
        //   const response = await changePassword(dataToUpdate).unwrap()
        //   if (response.status) {
        //     toast({
        //         title: response.status,
        //         description: response.message
        //     })
        //   }
        // } catch (error) {
        //     toast({
        //         title: error.data.status,
        //         description: error.data.message
        //     })
        // }

    }
  return (
        <Card className="">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Change your login password.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="mt-6">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                        <Input
                            type="password"
                            placeholder="old password" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                        <Input
                            type="password"
                            placeholder="new password" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                        <Input
                            type="password"
                            placeholder="confirm new password" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                /> 
                  <Button 
                    className="w-full"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                        ) : (
                        <>
                            Change password
                        </>
                        )
                    }
                  </Button>
              </form>
          </Form>    
        </div>
        </CardContent>
      </Card>
  )
}

export default ChangePasswordForm