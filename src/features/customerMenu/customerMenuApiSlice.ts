// import {
//     createSelector,
//     createEntityAdapter
// } from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

// const customerMenuAdapter = createEntityAdapter({})
// const initialState = customerMenuAdapter.getInitialState()

export const customerMenuApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStore: builder.query({
            query: ({ id }) => `/client/api/v1/store/${id}`,
            // validateStatus: (response, result) => {
            //     return response.status === 200 && !result.isError
            // },
            // providesTags: (result) => {
            //     if (result?.ids) {
            //         return [
            //             { type: 'store', id: 'LIST' },
            //             // ...result.ids.map(id => ({ type: 'store', id }))
            //         ]
            //     } else return [{ type: 'store', id: 'LIST' }]
            // }
        }),
        // findAllStore: builder.query({
        //     query: (credentials) => ({
        //       url: '/client/api/v1/store/list',
        //       method: 'POST',
        //       body: {
        //         query: {}, 
        //         options: {
        //             select: [ 'faculty_id', 'name', 'short_name', 'desc', 'isActive', 'isDeleted'],
        //             collation: "",
        //             sort: "",
        //             populate: "",
        //             projection: "",
        //             lean: false,
        //             leanWithId: true,
        //             pagination: true,
        //             useEstimatedCount: false,
        //             useCustomCountFn: false,
        //             forceCountFn: false,
        //             read: {},
        //             options: {},
        //           // other options from your query body
        //           ...credentials, // Pass pagination options
        //         },
        //         isCountOnly: false,
        //       },
        //     }),
        //     providesTags: (result, error, arg) => {
        //         if (result?.ids) {
        //             return [
        //                 ...result.ids.map(({id}) => ({ type: 'Store' as const, id })),
        //                 { type: 'Store', id: 'PARTIAL-LIST' }
        //             ]
        //         } else return [{ type: 'Store', id: 'PARTIAL-LIST' }]
        //     }
        // }),

        // getStoreCount: builder.mutation({
        //     query: credentials => ({
        //       url: "/client/api/v1/store/count",
        //       method: "POST",
        //       body: { ...credentials },
        //     }),
        //     invalidatesTags: [{ type: "Store", id: "PARTIAL-LIST" }],
        // }),

        findAllCategory: builder.query({
            query: (query) => ({
              url: '/client/api/v1/category/list',
              method: 'POST',
              body: {
                query: query,
                options: {
                    select: [ 'store_id', 'name', 'tag', 'isActive', 'isDeleted' ],
                    collation: "",
                    sort: "",
                    populate: "",
                    page: 1,
                    limit: 100,
                    offset: 0,
                    projection: "",
                    lean: false,
                    leanWithId: true,
                    pagination: true,
                    useEstimatedCount: false,
                    useCustomCountFn: false,
                    forceCountFn: false,
                    read: {},
                    options: {},
                },
                isCountOnly: false,
              },
            }),
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        // ...result.ids.map(({id}) => ({ type: 'Category' as const, id })),
                        { type: 'Category', id: 'PARTIAL-LIST' }
                    ]
                } else return [{ type: 'Category', id: 'PARTIAL-LIST' }]
            }
        }),
        getCategory: builder.query({
            query: ({ id }) => `/client/api/v1/category/${id}`,
            // validateStatus: (response, result) => {
            //     return response.status === 200 && !result.isError
            // },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'category', id }))
                    ]
                } else return [{ type: 'category', id: 'LIST' }]
            }
        }),
        getCategoryCount: builder.mutation({
            query: credentials => ({
              url: "/client/api/v1/category/count",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Category", id: "PARTIAL-LIST" }],
        }),

        findAllItem: builder.query({
            query: (query) => ({
              url: '/client/api/v1/item/list',
              method: 'POST',
              body: {
                query: query,
                options: {
                    select: [ 'category_id', 'total_price', 'name', 'content_list', 'isActive', 'isDeleted'],
                    collation: "",
                    sort: "",
                    populate: {
                        path : "content_list",
                        populate : {
                            path : "content_id",
                            select: "name varient price isActive"
                        }
                      },
                    // page: 1,
                    // limit: 100,
                    // offset: 0,
                    projection: "",
                    lean: false,
                    leanWithId: true,
                    pagination: false,
                    useEstimatedCount: false,
                    useCustomCountFn: false,
                    forceCountFn: false,
                    read: {},
                    options: {}
                },
                isCountOnly: false,
              },
            }),
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        // ...result.ids.map(({id}) => ({ type: 'Item' as const, id })),
                        { type: 'Item', id: 'PARTIAL-LIST' }
                    ]
                } else return [{ type: 'Item', id: 'PARTIAL-LIST' }]
            }
        }),
        getItem: builder.query({
            query: ({ id }) => `/client/api/v1/item/${id}`,
            // validateStatus: (response, result) => {
            //     return response.status === 200 && !result.isError
            // },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'item', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'item', id }))
                    ]
                } else return [{ type: 'item', id: 'LIST' }]
            }
        }),
        getItemCount: builder.mutation({
            query: credentials => ({
              url: "/client/api/v1/item/count",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Item", id: "PARTIAL-LIST" }],
        }),
        
    }),
})

export const {
    useGetStoreQuery,

    useFindAllCategoryQuery,
    useGetCategoryQuery,
    useGetCategoryCountMutation,
    
    useFindAllItemQuery,
    useGetItemQuery,
    useGetItemCountMutation,
} = customerMenuApiSlice

// // returns the query result object
// export const selectStoreResult = customerMenuApiSlice.endpoints.findAllStore.select()
// export const selectCategoryResult = customerMenuApiSlice.endpoints.findAllCategory.select()
// export const selectItemResult = customerMenuApiSlice.endpoints.findAllItem.select()

// // creates memoized selector
// const selectStoreData = createSelector(
//     selectStoreResult,
//     storeResult => storeResult.data // normalized state object with ids & entities
// )

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllStore,
//     selectById: selectStoreById,
//     selectIds: selectStoreIds,
//     // Pass in a selector that returns the classrooms slice of state
// } = customerMenuAdapter.getSelectors(state => selectStoreData(state) ?? initialState)