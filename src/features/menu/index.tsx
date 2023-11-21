import DashPageWrapper from '../../components/DashPageWrapper'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Category from './category'
import Item from './item'
import ItemContent from './itemContent'

function Menu() {
  return (
    <DashPageWrapper title='Menu'>
<Tabs defaultValue="items" className="space-y-4">
        <TabsList>
        <TabsTrigger value="items">Unit Items</TabsTrigger>
          <TabsTrigger value="menuCategories">Menu Categories</TabsTrigger>
          <TabsTrigger value="menuList">Menu List</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="space-y-4">
          <ItemContent />
        </TabsContent>
        <TabsContent value="menuCategories" className="space-y-4">
          <Category />
        </TabsContent>
        <TabsContent value="menuList" className="space-y-4">
          <Item />
        </TabsContent>
      </Tabs>
    </DashPageWrapper>
  )
}

export default Menu