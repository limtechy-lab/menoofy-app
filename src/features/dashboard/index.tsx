import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DashPageWrapper from "../../components/DashPageWrapper"
import Loader from "../../components/Loader"
import TableSkeleton from "@/components/skeleton/table-skeleton"
import StatsCard from "./StatsCard"

const Dashboard = () => {

  return (
    <DashPageWrapper title="">
      <Card>
        <div className=" flex justify-between items-center h-16 p-4">
          <div>
            <div className="font-medium text-xl">
              Welcome back 🍻
            </div>
              <p className="text-xs text-muted-foreground">
                Let your cutomers know what you have.
              </p>
          </div>
          <div>
            <div className="font-medium text-md">
              Premium Plan
            </div>
            <p className="text-xs text-muted-foreground">
              your subscribtion will expire in 12 days.
            </p>
          </div>
        </div>     
      </Card>
      <StatsCard />
    </DashPageWrapper>
  )
}
export default Dashboard