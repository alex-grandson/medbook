import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medbookAPI = createApi({
  reducerPath: 'medbookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getDoctors: build.query({
      query: (bodyPart = '') => `doctor?${bodyPart && `bodyPart=${bodyPart}`}`
    }),
    getUsers: build.query({
      query: (login = '') => `user?_limit=1&${login && `login=${login}`}`
    }),
    login: build.mutation({
      query: (body = {}) => ({ url: '/login', method: 'POST', body })
    }),
    registration: build.mutation({
      query: (body = {}) => ({ url: '/user', method: 'POST', body })
    })
  })
});

export const { useGetDoctorsQuery, useGetUsersQuery, useRegistrationMutation, useLoginMutation } =
  medbookAPI;
