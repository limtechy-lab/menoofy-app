import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../../app/api/apiSlice"

const itemAdapter = createEntityAdapter({})
const initialState = itemAdapter.getInitialState()

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        findAllMyItem: builder.query({
            query: (credentials) => ({
              url: '/admin/item/list',
              method: 'POST',
              body: {
                query: {}, 
                options: {
                    select: [ 'category_id', 'total_price', 'name', 'content_list', 'isActive', 'isDeleted'],
                    collation: "",
                    sort: "",
                    populate: [
                        {
                            path : "category_id",
                            select: "name tag isActive"
                        },
                        {
                            path : "content_list",
                            populate : {
                                path : "content_id",
                                select: "name varient price isActive"
                            }
                        }
                    ],
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
                        ...result.ids.map(({id}) => ({ type: 'Item' as const, id })),
                        { type: 'Item', id: 'PARTIAL-LIST' }
                    ]
                } else return [{ type: 'Item', id: 'PARTIAL-LIST' }]
            }
        }),
        addItem: builder.mutation({
            query: credentials => ({
              url: "/admin/item/create",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Item", id: "PARTIAL-LIST" }],
        }),

        getMyItemCount: builder.mutation({
            query: credentials => ({
              url: "/admin/item/count",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Item", id: "PARTIAL-LIST" }],
        }),
        updateMyItem: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/item/update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Item", id },
                { type: "Item", id: "PARTIAL-LIST" }
            ],
        }),
        partialUpdateMyItem: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/item/partial-update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Item", id },
                { type: "Item", id: "PARTIAL-LIST" }
            ],
        }),
        deleteMyItem: builder.mutation({
            query: ({ id }) => ({
              url: `/admin/item/delete/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: (result, error, id ) => [
              { type: "Item", id },
              { type: "Item", id: "PARTIAL-LIST" }
            ],
        }),
    }),
})

export const {
    useFindAllMyItemQuery,
    // useGetItemQuery,
    useAddItemMutation,
    useGetMyItemCountMutation,
    useUpdateMyItemMutation,
    usePartialUpdateMyItemMutation,
    useDeleteMyItemMutation,
} = itemApiSlice

// returns the query result object
export const selectItemResult = itemApiSlice.endpoints.findAllMyItem.select()

// creates memoized selector
const selectItemData = createSelector(
    selectItemResult,
    itemResult => itemResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllItem,
    selectById: selectItemById,
    selectIds: selectItemIds,
    // Pass in a selector that returns the classrooms slice of state
} = itemAdapter.getSelectors(state => selectItemData(state) ?? initialState)