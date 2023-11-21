import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useResetPasswordMutation } from '../authApiSlice'
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

const resetPasswordFormSchema = z.object({
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

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>

const defaultValues = {
    password: '',
    confirm_password: '',
    token:''
}

function ResetPasswordForm () {

    const { toast } = useToast()
    const navigate = useNavigate()
    const [ResetPassword, {
            isLoading
    }] = useResetPasswordMutation()

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues,
        mode: "onChange",
    })
    
    async function onSubmit(data: ResetPasswordFormValues) {
        console.log(data)
        const response =  await ResetPassword(data).unwrap()
        console.log(response)
        if (response.data && response.data.status === "SUCCESS") {
            toast({
                title: "SUCCESS",
                description: "Password reset successful"
            })
            navigate('/login', { replace: true })
        }
    }

    return (
        <div className="mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input
                                type="password"
                                placeholder="Enter student or parent phone number" 
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
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                            <Input
                                type="password"
                                placeholder="Confirm password" 
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
                                Reset Password
                            </>
                            )
                        }
                    </Button>
                </form>
            </Form>   
        </div>
    )
}

export default ResetPasswordForm