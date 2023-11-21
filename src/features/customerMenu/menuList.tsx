import { useState, useEffect } from 'react'
import { useFindAllCategoryQuery } from './customerMenuApiSlice';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { ModeToggle } from "@/components/mode-toggle";
  import CategoryItems from './categoryItem';

function MenuList({ store }) {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    
    const query = {store_id: store?.id}
    const { data: fetchedCategories, isLoading: isLoadingCategories } = useFindAllCategoryQuery(query);


    useEffect(() => {
        if (!fetchedCategories || !fetchedCategories.data) return;
        const { data: CategoriesData } = fetchedCategories.data ?? {};
        setCategories(CategoriesData);
    }, [fetchedCategories]);

    if (isLoadingCategories) {
      return (
        <div className=" h-screen w-screen flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )
    }

  return (
    <>
      <div className='flex justify-between items-center h-12 w-full border-b p-3'>
        <div>
          <h1 className=' uppercase'>{store?.name}</h1>
        </div>
        <ModeToggle />
      </div>
      {!categories.length ? (
        <p>No menu list found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full p-4">
            {categories.map((category) => (
                <AccordionItem key={category.id} value={category.id} >
                    <AccordionTrigger onClick={() => setSelectedCategory(category.id)} className=" hover:text-primary">
                    {category.name}
                    </AccordionTrigger>
                    {category.id === selectedCategory && <CategoryItems categoryId={category.id} />}
                </AccordionItem>
            ))}
        </Accordion>
      )}
    </>
  )
}

export default MenuList