import { useState, useEffect } from 'react';
import { useFindAllItemQuery } from './customerMenuApiSlice';
import {
    AccordionContent,
  } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import ItemDialog from './itemDialog'

function CategoryItems({ categoryId }) {

    const [items, setItems] = useState([]);
    const query = {category_id: categoryId}
    const { data: fetchedItems, isLoading, isError, } = useFindAllItemQuery(query);

    useEffect(() => {
        if (!fetchedItems || !fetchedItems.data) return;
        const { data: storeData } = fetchedItems.data;
        setItems(storeData);
    }, [fetchedItems]);

    console.log(items)
    if (isLoading) {
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-2">
            <div className="flex flex-row items-center gap-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <div className="flex items-center justify-between p-2">
            <div className="flex flex-row items-center gap-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      )
    }
  
    if (isError) {
      return <p>Error</p>;
    }
  
    return (
      <>
        <AccordionContent>
          {!items.length ? (
            <p>No items found.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                  <li 
                      key={item.id}
                  
                  >
                      <ItemDialog item={item} />
                  </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </>
    );
  }

export default CategoryItems