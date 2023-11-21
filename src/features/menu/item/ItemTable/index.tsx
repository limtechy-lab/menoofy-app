import { useMemo, useState, useEffect } from "react";
import { useFindAllMyItemQuery } from "../itemApiSlice";
import { DataTable } from "./dataTable";
import { columns } from "./columns"

export type argsType = {
  page: number
  limit: number
}

const ItemTable = () => {
    // const [ queriedPaginator, setQueriedPaginator ] = React.useState({});
    const [item, setItem] = useState(null);
    const memoizedItem = useMemo(() => item || [], [item]);
    const [ pageCount, setPageCount ] = useState(-1)
    const [ page, setPage ] = useState(1)
    const [ limit, setLimit ] = useState(10)

    const { data, isFetching } = useFindAllMyItemQuery({page, limit, offset: (page - 1)*limit}, {
      // refetchOnFocus: true,
      // refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (!data || !data.data) return;
      const { data: itemData, paginator } = data.data;
      const { pageCount } = paginator
      setItem(itemData);
      setPageCount(pageCount)
    }, [data]);

    const handleArgsChange = ({ page, limit }: argsType) => {
      setPage(page + 1);
      setLimit(limit);
    }
    
    return (
      <div>
        <DataTable 
          columns={columns} 
          data={memoizedItem} 
          onAgrsChange={handleArgsChange} 
          pageCount={pageCount} 
          isFatching={isFetching} 
        />
      </div>
    );
  };

export default ItemTable;