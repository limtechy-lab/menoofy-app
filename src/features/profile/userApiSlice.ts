import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLogedInUser: builder.query({
            query: () => `/admin/user/me`,
            // validateStatus: (response, result) => {
            //     return response.status === "SUCCESS" && !result.isError
            // },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'user', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'user', id }))
                    ]
                } else return [{ type: 'user', id: 'LIST' }]
            }
        }),
        changePassword: builder.mutation({
            query: (credentials) => ({
                url: `/admin/user/change-password`,
                method: "PUT",
                body: { ...credentials }
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "User", id },
                { type: "User", id: "LIST" }
            ],
        }),
        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: `/admin/user/update-profile`,
                method: "PUT",
                body: { ...credentials }
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "User", id },
                { type: "User", id: "LIST" }
            ],
        }),
        // softDeleteUser: builder.mutation({
        //     query: ({ id }) => ({
        //       url: `/admin/user/softDelete/${id}`,
        //       method: "PUT",
        //     }),
        //     invalidatesTags: (result, error, id ) => [
        //       { type: "User", id },
        //       { type: "User", id: "PARTIAL-LIST" }
        //     ],
        // }),
    }),
})

export const {
    useGetLogedInUserQuery,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    // useSoftDeleteUserMutation,
} = userApiSlice

// returns the query result object
export const selectUserResult = userApiSlice.endpoints.getLogedInUser.select()

// creates memoized selector
const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUser,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the classrooms slice of state
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)