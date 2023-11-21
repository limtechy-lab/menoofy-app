import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../authSlice'
import { useLoginMutation } from '../authApiSlice'
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

const loginFormSchema = z.object({
    username: z.string({required_error: "Required"}).email('Invalid email address'),
    password: z.string({required_error: "Required"}),
})

 export type loginFormValues = z.infer<typeof loginFormSchema>

function LoginForm() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation()
    const from = location?.state?.from?.pathname || "/dashboard"

    const { toast } = useToast()
    const [ login, { isLoading }] = useLoginMutation();

    const defaultValues = {
        username: "",
        password: "",
    }
    const form = useForm<loginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: loginFormValues) {
        try {
           const response = await login(data).unwrap()
            if (response.status) {
                toast({
                    title: response.status,
                    description: response.message
                })
            }
            if (response.status === "SUCCESS") {
                const { name, email, phone, username, token, isStoreAdded, isActive, isDeleted } = response.data
                dispatch(setCredentials({ name, email, phone, username, token, isStoreAdded, isActive, isDeleted }))
                navigate(from, { replace: true })
            }
        } catch (error) {
            toast({
                title: "Server_Error",
            })
        }
    }
    
  return (
    <div className="mt-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input
                            type="password"
                            placeholder="Enter your password" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <p className="text-sm text-muted-foreground">
                    Forgot password?&nbsp;
                    <Link
                        to="/forgot-password"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        reset password
                    </Link>
                </p>
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
                            Sign In
                        </>
                        )
                    }
                </Button>
            </form>
        </Form>    
    </div>
  )
}

export default LoginForm
