import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';

export const medbookAPI = createApi({
  reducerPath: 'medbookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getDoctor: build.query({
      query: (bodyPart = '') => `/user?isDoctor=true&${bodyPart && `bodyPart=${bodyPart}`}`
    }),
    getDoctorSchedule: build.query({
      query: (doctorId = '') =>
        `/appointment?${doctorId && `doctorId=${doctorId}&_sort=date,timeSlot&_order=asc,asc&`}`
    }),
    getPatientSchedule: build.mutation({
      query: (patientId = '') => `/appointment?${patientId && `patientId=${patientId}`}`
    }),
    makeAppointment: build.mutation({
      query: (body = {}) => ({ url: '/appointment', method: 'POST', body })
    }),
    markAppointment: build.mutation({
      query: (body = {}) => {
        const { id } = body;
        return { url: `/appointment/${id}`, method: 'PUT', body: { ...body } };
      }
    }),
    getDoctorByEmail: build.query({
      query: (email = '') => `user?isDoctor=true&${email && `email=${email}`}`
    }),
    getUsers: build.query({
      query: (login = '') => `user?_limit=1&${login && `email=${login}`}`
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
    editUser: build.mutation({
      query: (body = {}) => {
        const { id } = body;
        return { url: `/user/${id}`, method: 'PUT', body: { ...body } };
      }
    }),
    getTodayAppointments: build.query({
      query: (login = '') =>
        `appointment?${login && `patientId=${login}`}&${`date=${format(new Date(), 'yyyy-MM-dd')}`}`
    }),
    getUserByEmail: build.mutation({
      query: (email = '') => `user?${email && `email=${email}`}`
    })
  })
});

export const {
  useGetDoctorQuery,
  useGetDoctorByEmailQuery,
  useGetUsersQuery,
  useRegistrationMutation,
  useLoginMutation,
  useMakeAppointmentMutation,
  useGetDoctorScheduleQuery,
  useGetPatientScheduleMutation,
  useEditUserMutation,
  useMarkAppointmentMutation,
  useGetTodayAppointmentsQuery,
  useGetUserByEmailMutation
} = medbookAPI;
