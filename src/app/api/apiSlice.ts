import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
// import { setCredentials } from '../../features/auth/authSlice';
import { RootState } from '../store'; // Assuming you have a RootState type

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://cooperative-hare-ring.cyclic.app', // baseUrl: 'http://localhost:5050',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async ( args, api, extraOptions ) => {
  // `arg` has the type `string`
  // `api` has the type `BaseQueryApi` (not configurable)
  // `extraOptions` has the type `{ shout?: boolean }

  const result = await baseQuery(args, api, extraOptions);

  // // If you want, handle other status codes, too
  // if (result?.error?.status === 403) {
  //   console.log('sending refresh token');

  //   // send refresh token to get a new access token
  //   const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
  //   if (refreshResult?.data) {
  //     // store the new token
  //     api.dispatch(setCredentials({ ...refreshResult.data }));

  //     // retry the original query with the new access token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     if (refreshResult?.error?.status === 403) {
  //       refreshResult.error.data.message = ' Your session has expired.';
  //     }
  //     return refreshResult;
  //   }
  // }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Category', 'Item', 'ItemContent', 'Store'],
  endpoints: (builder) => ({}),
});
