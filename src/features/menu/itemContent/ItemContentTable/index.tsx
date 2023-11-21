import { useMemo, useState, useEffect } from "react";
import { useFindAllItemContentQuery } from "../itemContentApiSlice";
import { DataTable } from "./dataTable";
import { columns } from "./columns"

export type argsType = {
  page: number
  limit: number
}

const ItemContentTable = () => {
    const [itemContent, setItemContent] = useState(null);
    const memoizedItemContent = useMemo(() => itemContent || [], [itemContent]);
    const [ pageCount, setPageCount ] = useState(-1)
    const [ page, setPage ] = useState(1)
    const [ limit, setLimit ] = useState(10)

    const { data, isFetching } = useFindAllItemContentQuery({page, limit, offset: (page - 1)*limit}, {
      // refetchOnFocus: true,
      // refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (!data || !data.data) return;
      const { data: itemContentData, paginator } = data?.data ?? {};
      setItemContent(itemContentData);
      const { pageCount } = paginator
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
          data={memoizedItemContent} 
          onAgrsChange={handleArgsChange} 
          pageCount={pageCount} 
          isFatching={isFetching} 
        />
      </div>
    );
  };

export default ItemContentTable;