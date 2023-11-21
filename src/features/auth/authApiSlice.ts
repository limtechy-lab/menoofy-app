import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/admin/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/admin/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        forgotPassword: builder.mutation({
            query: credentials => ({
                url: '/admin/auth/forgot-password',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        validateOtp: builder.mutation({
            query: credentials => ({
                url: '/admin/auth/validate-otp',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        resetPassword: builder.mutation({
            query: credentials => ({
                url: '/admin/auth/reset-password',
                method: 'PUT',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/admin/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled } ) {
                try {
                    //const { data } = 
                    await queryFulfilled
                    //console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useValidateOtpMutation,
    useResetPasswordMutation,
    useSendLogoutMutation
} = authApiSlice 