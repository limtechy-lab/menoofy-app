import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStoreAdded } from '../../auth/authSlice'
import { useAddStoreMutation } from "../storeApiSlice"
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

const storeFormSchema = z.object({
  name: z.string({required_error: "Required"}),
  email: z.string({required_error: "Required"}).email('Invalid email address'),
  phone: z.string({required_error: "Required"}),
  location: z.string({required_error: "Required"}),
  store_type: z.string({required_error: "Required"}),
})

type storeFormValues = z.infer<typeof storeFormSchema>

function StoreForm() {

    const { toast } = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addStore, {isLoading}] = useAddStoreMutation()

    const defaultValues = {
      name: '',
      email: '',
      phone: '',
      location: '',
      store_type: '',
    }
    const form = useForm<storeFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: storeFormValues) {
        try {
          const response = await addStore(data).unwrap()
          if (response.status) {
            toast({
                title: response.status,
                description: response.message
            })
          }
          if (response.status === "SUCCESS") {
            dispatch(setStoreAdded({isStoreAdded: true}))
            navigate("/dashboard", { replace: true })
            }
        } catch (error) {
            toast({
                title: 'Server_Error',
                // description: error.data.message
            })
        }
    }

  return (
      <Card className="">
        <CardHeader>
          <CardTitle>New Kitchen</CardTitle>
          <CardDescription>Welcome onboard, add your kitchen details.</CardDescription>
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
                          <Input placeholder="The New Restaurant" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="store_type"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Kitchen type</FormLabel>
                          <FormControl>
                          <Input placeholder="Restaurant and Bar" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                          <Input placeholder="Jabbi lake mall, Abuja" {...field} />
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
                          <Input placeholder="mycontactemail@gmail.com" {...field} />
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
                          <Input placeholder="+2348123456789" {...field} />
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
                             Save changes
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

export default StoreForm