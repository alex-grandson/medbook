import { createSlice } from '@reduxjs/toolkit';

import { ROLES } from '../constants';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    role: undefined,
    userInfo: undefined
  },
  reducers: {
    setProperties: (state, { payload: { newUserInfo } }) => {
      const { userInfo } = state;
      userInfo.birthDate = newUserInfo.birthDate;
      userInfo.email = newUserInfo.email;
      userInfo.firstName = newUserInfo.firstName;
      userInfo.lastName = newUserInfo.lastName;
      return state;
    },
    login: (state, { payload: { info } }) => {
      state.authenticated = true;
      state.role = info.role;
      state.userInfo = info;
      return state;
    },
    setRole: (state, { payload: { role } }) => {
      if (role === ROLES.DOCTOR) state.role = role;
      else state.role = ROLES.PATIENT;
      return state;
    },
    logout: (state) => {
      state.authenticated = false;
      state.role = undefined;
      state.userInfo = undefined;
      return state;
    }
  }
});

export const { setProperties, login, setRole, logout } = authSlice.actions;

export default authSlice.reducer;
