import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const userFormSchema = z.object({
  name: z.string({required_error: "Required"}),
  email: z.string({required_error: "Required"}).email('Invalid email address'),
  phone: z.string({required_error: "Required"}),
  username: z.string({required_error: "Required"}),
})

type userFormValues = z.infer<typeof userFormSchema>

function UserForm() {

    const user = useSelector(selectCurrentUser)
    // console.log(user)

    const { toast } = useToast()

    // const [updateStore, {isLoading}] = useUpdateStoreMutation()

    const defaultValues = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username,
    }
    const form = useForm<userFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: userFormValues) {
        // try {
        //   const dataToUpdate = {
        //     location: data.location,
        //     email: data.email,
        //     phone: data.phone
        //   }
        //   const response = await updateStore(dataToUpdate).unwrap()
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
          <CardTitle>User Details</CardTitle>
          <CardDescription>Veiw your profile details.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="mt-6">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                          <Input disabled placeholder="" {...field} />
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
                          <Input disabled placeholder="" {...field} />
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
                          <FormLabel>Contact email</FormLabel>
                          <FormControl>
                          <Input disabled placeholder="" {...field} />
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
                          <FormLabel>Contact phone</FormLabel>
                          <FormControl>
                          <Input disabled placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <Button 
                      className="w-full"
                      type="submit"
                      disabled={true}
                  >
                      {/* {isLoading ? (
                          <>
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Please wait
                          </>
                          ) : (
                          <>
                             Save changes
                          </>
                          )
                      } */}
                      Save changes
                  </Button>
              </form>
          </Form>    
        </div>
        </CardContent>
      </Card>
  )
}

export default UserForm