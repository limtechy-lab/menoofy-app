import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function Welcome({ name, goToMenu }) {
  return (
    <Card className={cn("w-full min-h-screen flex flex-col justify-center items-start" )}>
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle className=" uppercase">Welcome to {name}</CardTitle>
        <CardDescription>Discover a world of culinary delights and handcrafted cocktails 🍜🍹</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">

      </CardContent>
      <CardFooter>
        <Button 
        className="w-full"
        onClick={goToMenu}
        >
           Go to Menu
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Welcome