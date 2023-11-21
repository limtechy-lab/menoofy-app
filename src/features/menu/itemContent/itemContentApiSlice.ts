import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../../app/api/apiSlice"

const itemContentAdapter = createEntityAdapter({})
const initialState = itemContentAdapter.getInitialState()

export const itemContentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        findAllItemContent: builder.query({
            query: (credentials) => ({
              url: '/admin/itemContent/list',
              method: 'POST',
              body: {
                query: {}, 
                options: {
                    select: [ 'store_id', 'varient', 'name', 'price', 'isActive', 'isDeleted'],
                    collation: "",
                    sort: "",
                    populate: "store_id",
                    projection: "",
                    lean: false,
                    leanWithId: true,
                    pagination: true,
                    useEstimatedCount: false,
                    useCustomCountFn: false,
                    forceCountFn: false,
                    read: {},
                    options: {},
                  // other options from your query body
                  ...credentials, // Pass pagination options
                },
                isCountOnly: false,
              },
            }),
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        ...result.ids.map(({id}) => ({ type: 'ItemContent' as const, id })),
                        { type: 'ItemContent', id: 'PARTIAL-LIST' }
                    ]
                } else return [{ type: 'ItemContent', id: 'PARTIAL-LIST' }]
            }
        }),
        // getItemContent: builder.query({
        //     query: ({ id }) => `/admin/itemContent/${id}`,
        //     validateStatus: (response, result) => {
        //         return response.status === 200 && !result.isError
        //     },
        //     // keepUnusedDataFor: 5,
        //     // transformResponse: responseData => {
        //     //     const loadedItemContent = responseData.map(itemContent => {
        //     //         itemContent.id = itemContent._id
        //     //         return itemContent
        //     //     });
        //     //     return itemContentAdapter.setAll(initialState, loadedItemContent) //set loaded classroom to state
        //     // },
        //     providesTags: (result, error, arg) => {
        //         if (result?.ids) {
        //             return [
        //                 { type: 'itemContent', id: 'LIST' },
        //                 ...result.ids.map(id => ({ type: 'itemContent', id }))
        //             ]
        //         } else return [{ type: 'itemContent', id: 'LIST' }]
        //     }
        // }),
        addItemContent: builder.mutation({
            query: credentials => ({
              url: "/admin/itemContent/create",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "ItemContent", id: "PARTIAL-LIST" }],
        }),

        getItemContentCount: builder.mutation({
            query: credentials => ({
              url: "/admin/itemContent/count",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "ItemContent", id: "PARTIAL-LIST" }],
        }),
        updateItemContent: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/itemContent/update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "ItemContent", id },
                { type: "ItemContent", id: "PARTIAL-LIST" }
            ],
        }),
        partialUpdateItemContent: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/itemContent/partial-update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "ItemContent", id },
                { type: "ItemContent", id: "PARTIAL-LIST" }
            ],
        }),
        deleteItemContent: builder.mutation({
            query: ({ id }) => ({
              url: `/admin/itemContent/delete/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: (result, error, id ) => [
              { type: "ItemContent", id },
              { type: "ItemContent", id: "PARTIAL-LIST" },
              { type: "Item", id: "PARTIAL-LIST" }
            ],
        }),
    }),
})

export const {
    useFindAllItemContentQuery,
    // useGetItemContentQuery,
    useAddItemContentMutation,
    useGetItemContentCountMutation,
    useUpdateItemContentMutation,
    usePartialUpdateItemContentMutation,
    useDeleteItemContentMutation,
} = itemContentApiSlice

// returns the query result object
export const selectItemContentResult = itemContentApiSlice.endpoints.findAllItemContent.select()

// creates memoized selector
const selectItemContentData = createSelector(
    selectItemContentResult,
    itemContentResult => itemContentResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllItemContent,
    selectById: selectItemContentById,
    selectIds: selectItemContentIds,
    // Pass in a selector that returns the classrooms slice of state
} = itemContentAdapter.getSelectors(state => selectItemContentData(state) ?? initialState)