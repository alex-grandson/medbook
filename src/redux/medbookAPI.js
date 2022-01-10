import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medbookAPI = createApi({
  reducerPath: 'medbookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getDoctors: build.query({
      query: (bodyPart = '') => `doctor?${bodyPart && `bodyPart=${bodyPart}`}`
    }),
    getSchedule: build.query({
      query: (doctorId = '') => `schedule?${doctorId && `doctorId=${doctorId}`}`
    }),
    getDoctorById: build.query({
      query: (id = '') => `doctor?${id && `id=${id}`}`
    }),
    getUsers: build.query({
      query: (login = '') => `user?_limit=1&${login && `login=${login}`}`
    }),
    login: build.mutation({
      query: (params) => {
        const { email, password } = params;
        return `user?${email && `email=${email}`}&${password && `password=${password}`}`;
      }
    }),
    registration: build.mutation({
      query: (body = {}) => ({ url: '/user', method: 'POST', body })
    }),
    makeAppointment: build.mutation({
      query: (body = {}) => ({ url: '/appointment', method: 'POST', body })
    }),
    editUser: build.mutation({
      query: (body = {}) => {
        const { id } = body;
        return { url: `/user/${id}`, method: 'PUT', body: { ...body } };
      }
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
