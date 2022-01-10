import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medbookAPI = createApi({
  reducerPath: 'medbookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getDoctors: build.query({
      query: (bodyPart = '') => `doctor?${bodyPart && `bodyPart=${bodyPart}`}`
    }),
    getSchedule: build.query({
      query: (doctorId = '') => `getSchedule?${doctorId && `doctorId=${doctorId}`}`
    }),
    getDoctorById: build.query({
      query: (id = '') => `doctor?${id && `id=${id}`}`
    }),
    getUsers: build.query({
      query: (login = '') => `user?_limit=1&${login && `login=${login}`}`
    }),
    login: build.mutation({
      query: (body = {}) => ({ url: '/login', method: 'POST', body })
    }),
    registration: build.mutation({
      query: (body = {}) => ({ url: '/user', method: 'POST', body })
    }),
    makeAppointment: build.mutation({
      query: (body = {}) => ({ url: '/appointment', method: 'POST', body })
    }),
    editUser: build.mutation({
      query: (body = {}) => ({ url: '/editUser', method: 'POST', body })
    }),
    markAppointment: build.mutation({
      query: (body = {}) => ({ url: '/markAppointment', method: 'POST', body })
    })
  })
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetUsersQuery,
  useRegistrationMutation,
  useLoginMutation,
  useMakeAppointmentMutation,
  useGetScheduleQuery,
  useEditUserMutation,
  useMarkAppointmentMutation
} = medbookAPI;
