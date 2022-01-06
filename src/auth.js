import { ROLES } from './constants';

class Auth {
  constructor() {
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
