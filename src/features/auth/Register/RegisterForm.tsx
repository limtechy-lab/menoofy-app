import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRegisterMutation } from '../authApiSlice'
import { useToast } from "@/components/ui/use-toast"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const registerFormSchema = z.object({
    username: z.string().nonempty('Field is required'),
    name: z.string().nonempty('Field is required'),
    email: z.string().email('Invalid email address').nonempty('Field is required'),
    phone: z.string()
        .nonempty('Field is required')
        .min(10, 'Must be 10 numbers')
        .max(10, 'Must be 10 numbers'),
    password: z.string()
        .nonempty('Field is required')
        .min(8, 'Must be more than 8 characters long')
        .refine((value) => /[0-9]/.test(value), 'Password requires a number')
        .refine((value) => /[a-z]/.test(value), 'Password requires a lowercase letter')
        .refine((value) => /[A-Z]/.test(value), 'Password requires an uppercase letter')
        .refine((value) => /[^\w]/.test(value), 'Password requires a symbol'),
    confirm_password: z.string(),
    terms_conditions: z.boolean()
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>

const defaultValues = {
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms_conditions: false
}
// type args = {
//     onRegSuccess: boolean;
//   }

function RegisterForm({onRegSuccess}) {

    const { toast } = useToast()
    const [register, { 
        isLoading,
        // isError,
        // error,
     }] = useRegisterMutation()

    const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: "onChange",
    })

    async function onSubmit(data: RegisterFormValues) {
        // console.log(data)
        //     const data = JSON.stringify(data, null, 2)
        const response = await register(data).unwrap()
        // console.log(response)
        if (response.data && response.status === "SUCCESS") {
            toast({
                title: "SUCCESS",
                description: "Registration successful"
            })
            onRegSuccess(response.data.email)
        }
    }
  return (
    <div className="mt-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Adebayo Abdul" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                        <Input placeholder="myusername" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="myemail@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                        <Input placeholder="08123456789" {...field} />
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
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" 
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
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                /> 
                <FormField
                    control={form.control}
                    name="terms_conditions"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                I agree to Terms of Service and Privacy Policy.
                            </FormLabel>
                            <FormDescription>
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link
                                to="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                                >
                                Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                to="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                                >
                                Privacy Policy
                                </Link>
                                .
                            </p>
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                />  
                <Button 
                    className="w-full"
                    type="submit"
                    disabled={isLoading || !form.getValues("terms_conditions")}
                >
                    {isLoading ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                        ) : (
                        <>
                            Continue
                        </>
                        )
                    }
                </Button>
            </form>
        </Form>   
    </div>
  )
}

export default RegisterForm