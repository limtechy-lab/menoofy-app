import { useMemo, useState, useEffect } from "react";
import { useFindAllMyCategoryQuery } from "../categoryApiSlice";
import { DataTable } from "./dataTable";
import { columns } from "./columns"

export type argsType = {
  page: number
  limit: number
}

const CategoryTable = () => {
    // const [ queriedPaginator, setQueriedPaginator ] = React.useState({});
    const [category, setCategory] = useState(null);
    const memoizedCategory = useMemo(() => category || [], [category]);
    const [ pageCount, setPageCount ] = useState(-1)
    const [ page, setPage ] = useState(1)
    const [ limit, setLimit ] = useState(10)

    const { data, isFetching } = useFindAllMyCategoryQuery({page, limit, offset: (page - 1)*limit}, {
      // refetchOnFocus: true,
      // refetchOnMountOrArgChange: true
    });

    useEffect(() => {
      if (!data || !data.data) return;
      const { data: categoryData, paginator } = data.data;
      const { pageCount } = paginator
      setCategory(categoryData);
      setPageCount(pageCount)
      // setQueriedPaginator(paginator)
    }, [data]);

    const handleArgsChange = ({ page, limit }: argsType) => {
      setPage(page + 1);
      setLimit(limit);
    }
    
    return (
      <div>
        <DataTable 
          columns={columns} 
          data={memoizedCategory} 
          onAgrsChange={handleArgsChange} 
          pageCount={pageCount}
          // queriedPaginator={queriedPaginator} 
          isFatching={isFetching} 
        />
      </div>
    );
  };

export default CategoryTable;