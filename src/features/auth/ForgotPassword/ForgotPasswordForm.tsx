import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useForgotPasswordMutation } from '../authApiSlice';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const sendOpt2faFormSchema = z.object({
    username: z.string({required_error: "Required"}).email('Invalid email address'),
})

type sendOpt2faFormValues = z.infer<typeof sendOpt2faFormSchema>


const ForgotPasswordForm = () => {

    const [isOtpSent, setIsOtpSent] = useState(false)

    const [forgotPassword, { 
            isLoading,
            isSuccess,
            isError,
            error,
    }] = useForgotPasswordMutation()

    const { toast } = useToast()

    const defaultValues = {
        username: "",
    }
    const form = useForm<sendOpt2faFormValues>({
        resolver: zodResolver(sendOpt2faFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: sendOpt2faFormValues) {
        try {
            const response = await forgotPassword(data).unwrap()
            toast({
                title: response.status,
                description: response.message
            })
            if (response.data && response.status === "SUCCESS") {
                setIsOtpSent(true);
            }

        } catch (error) {
            toast({
                title: error.status,
                description: error.message
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
                <Button 
                    className="w-full"
                    type="submit"
                    disabled={isLoading || isOtpSent}
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

export default ForgotPasswordForm