import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medbookAPI = createApi({
  reducerPath: 'medbookAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getDoctor: build.query({
      query: (bodyPart = '') => `/user?isDoctor=true&${bodyPart && `bodyPart=${bodyPart}`}`
    }),
    getDoctorSchedule: build.query({
      query: (doctorId = '') =>
        `/appointment?_sort=date,timeSlot&_order=asc,asc${doctorId && `doctorId=${doctorId}`}`
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
    getDoctorById: build.query({
      query: (id = '') => `user?isDoctor=true&${id && `id=${id}`}`
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
    })
    // markAppointment: build.mutation({
    //   query: (body = {}) => ({ url: '/markAppointment', method: 'POST', body })
    // })
  })
});

export const {
  useGetDoctorQuery,
  useGetDoctorByIdQuery,
  useGetUsersQuery,
  useRegistrationMutation,
  useLoginMutation,
  useMakeAppointmentMutation,
  useGetDoctorScheduleQuery,
  useGetPatientScheduleMutation,
  useEditUserMutation,
  useMarkAppointmentMutation
} = medbookAPI;
