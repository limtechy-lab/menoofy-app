import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useUpdateStoreMutation } from "./storeApiSlice"
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
import StoreLogo from './StoreLogo'

const storeFormSchema = z.object({
  name: z.string({required_error: "Required"}),
  email: z.string({required_error: "Required"}).email('Invalid email address'),
  phone: z.string({required_error: "Required"}),
  location: z.string({required_error: "Required"}),
  store_type: z.string({required_error: "Required"}),
})

type storeFormValues = z.infer<typeof storeFormSchema>

function StoreForm({ store }) {

    const { toast } = useToast()

    const [updateStore, {isLoading}] = useUpdateStoreMutation()

    const defaultValues = {
      name: store.name,
      email: store.email,
      phone: store.phone,
      location: store.location,
      store_type: store.store_type,
    }
    const form = useForm<storeFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: storeFormValues) {
        try {
          const dataToUpdate = {
            location: data.location,
            email: data.email,
            phone: data.phone
          }
          const response = await updateStore(dataToUpdate).unwrap()
          if (response.status) {
            toast({
                title: response.status,
                description: response.message
            })
          }
        } catch (error) {
            toast({
                title: "Server_Error",
                // description: error.data.message
            })
        }
    }

  return (
      <Card className="">
        <div className=" flex justify-between items-start">
            <CardHeader>
                <CardTitle>Kitchen Details</CardTitle>
                <CardDescription>Veiw and update your kitchen details.</CardDescription>
            </CardHeader>
            <StoreLogo />
        </div>
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
                      name="store_type"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Kitchen type</FormLabel>
                          <FormControl>
                          <Input disabled placeholder="" {...field} />
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
                          <Input placeholder="" {...field} />
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