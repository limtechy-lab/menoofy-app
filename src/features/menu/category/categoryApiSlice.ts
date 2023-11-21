import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../../app/api/apiSlice"

const categoryAdapter = createEntityAdapter({})
const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        findAllMyCategory: builder.query({
            query: (credentials) => ({
              url: '/admin/category/list',
              method: 'POST',
              body: {
                query: {}, 
                options: {
                    select: [ 'store_id', 'name', 'tag', 'isActive', 'isDeleted'],
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
                        ...result.ids.map(({id}) => ({ type: 'Category' as const, id })),
                        { type: 'Category', id: 'PARTIAL-LIST' }
                    ]
                } else return [{ type: 'Category', id: 'PARTIAL-LIST' }]
            }
        }),
        // getCategory: builder.query({
        //     query: ({ id }) => `/admin/category/${id}`,
        //     validateStatus: (response, result) => {
        //         return response.status === 200 && !result.isError
        //     },
        //     // keepUnusedDataFor: 5,
        //     // transformResponse: responseData => {
        //     //     const loadedCategory = responseData.map(category => {
        //     //         category.id = category._id
        //     //         return category
        //     //     });
        //     //     return categoryAdapter.setAll(initialState, loadedCategory) //set loaded classroom to state
        //     // },
        //     providesTags: (result, error, arg) => {
        //         if (result?.ids) {
        //             return [
        //                 { type: 'category', id: 'LIST' },
        //                 ...result.ids.map(id => ({ type: 'category', id }))
        //             ]
        //         } else return [{ type: 'category', id: 'LIST' }]
        //     }
        // }),
        addCategory: builder.mutation({
            query: credentials => ({
              url: "/admin/category/create",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Category", id: "PARTIAL-LIST" }],
        }),

        getMyCategoryCount: builder.mutation({
            query: credentials => ({
              url: "/admin/category/count",
              method: "POST",
              body: { ...credentials },
            }),
            invalidatesTags: [{ type: "Category", id: "PARTIAL-LIST" }],
        }),
        updateMyCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/category/update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Category", id },
                { type: "Category", id: "PARTIAL-LIST" }
            ],
        }),
        partialUpdateMyCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/category/partial-update/${id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Category", id },
                { type: "Category", id: "PARTIAL-LIST" }
            ],
        }),
        deleteMyCategory: builder.mutation({
            query: ({ id }) => ({
              url: `/admin/category/delete/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: (result, error, id ) => [
              { type: "Category", id },
              { type: "Category", id: "PARTIAL-LIST" },
              { type: "Item", id: "PARTIAL-LIST" },
            ],
        }),
    }),
})

export const {
    useFindAllMyCategoryQuery,
    // useGetCategoryQuery,
    useAddCategoryMutation,
    useGetMyCategoryCountMutation,
    useUpdateMyCategoryMutation,
    usePartialUpdateMyCategoryMutation,
    useDeleteMyCategoryMutation,
} = categoryApiSlice

// returns the query result object
export const selectCategoryResult = categoryApiSlice.endpoints.findAllMyCategory.select()

// creates memoized selector
const selectCategoryData = createSelector(
    selectCategoryResult,
    categoryResult => categoryResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCategory,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
    // Pass in a selector that returns the classrooms slice of state
} = categoryAdapter.getSelectors(state => selectCategoryData(state) ?? initialState)