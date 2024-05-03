import baseApi from '@app/store/api/base';

import { AuthParams, AuthResponse } from './types';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<AuthResponse, AuthParams>({
      query: ({ username, password }) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: { username, password },
      }),
    }),

    signUp: builder.mutation<AuthResponse, AuthParams>({
      query: ({ username, password }) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
