import { ROLES } from './constants';

class Auth {
  constructor() {
    const authStateFromLocalStore = localStorage.getItem('userInfo');
    if (authStateFromLocalStore) {
      this.authenticated = true;
      this.role = authStateFromLocalStore.isDoctor ? ROLES.DOCTOR : ROLES.PATIENT;
      this.userInfo = authStateFromLocalStore;
      return null;
    }
    this.authenticated = false;
    this.role = undefined;
    this.userInfo = undefined;
  }

  setProperties(authenticated, role, userInfo) {
    this.authenticated = authenticated;
    this.role = role;
    this.userInfo = userInfo;
  }

  login(cb, info) {
    this.authenticated = true;
    this.role = info.role;
    this.userInfo = info;
    cb();
  }

  setRole(role) {
    if (role === ROLES.DOCTOR) this.role = role;
    else this.role = ROLES.PATIENT;
  }

  getRole() {
    return this.role;
  }

  logout(cb) {
    this.authenticated = false;
    this.role = undefined;
    this.userInfo = undefined;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isDoctor() {
    return this.role === ROLES.DOCTOR;
  }

  getUserInfo() {
    return this.userInfo;
  }
}

export default new Auth();
