import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginSuccess } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/signup/',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: ({ user_name, password }) => ({
        url: '/login/',
        method: 'POST',
        body: { user_name, password },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess({ token: data.access_token, user: args.user_name }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
