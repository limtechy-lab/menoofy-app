import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const storeAdapter = createEntityAdapter({})
const initialState = storeAdapter.getInitialState()

export const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMyStore: builder.query({
            query: () => `/admin/store`,
            // validateStatus: (response, result) => {
            //     return response.status === "SUCCESS" && !result.isError
            // },
            // providesTags: (result, error, arg) => {
            //     if (result?.ids) {
            //         return [
            //             { type: 'store', id: 'LIST' },
            //             ...result.ids.map(id => ({ type: 'store', id }))
            //         ]
            //     } else return [{ type: 'store', id: 'LIST' }]
            // }
        }),
        addStore: builder.mutation({
            query: credentials => ({
              url: "/admin/store/create",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Store", id: "LIST" }],
        }),
        updateStore: builder.mutation({
            query: (credentials) => ({
                url: `/admin/store/update`,
                method: "PUT",
                body: { ...credentials }
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Store", id },
                { type: "Store", id: "PARTIAL-LIST" }
            ],
        }),
        // softDeleteStore: builder.mutation({
        //     query: ({ id }) => ({
        //       url: `/admin/store/softDelete/${id}`,
        //       method: "PUT",
        //     }),
        //     invalidatesTags: (result, error, id ) => [
        //       { type: "Store", id },
        //       { type: "Store", id: "PARTIAL-LIST" }
        //     ],
        // }),
    }),
})

export const {
    useGetMyStoreQuery,
    useAddStoreMutation,
    useUpdateStoreMutation,
    // useSoftDeleteStoreMutation,
} = storeApiSlice

// returns the query result object
export const selectStoreResult = storeApiSlice.endpoints.getMyStore.select()

// creates memoized selector
const selectStoreData = createSelector(
    selectStoreResult,
    storeResult => storeResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStore,
    selectById: selectStoreById,
    selectIds: selectStoreIds,
    // Pass in a selector that returns the classrooms slice of state
} = storeAdapter.getSelectors(state => selectStoreData(state) ?? initialState)