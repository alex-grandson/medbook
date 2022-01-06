import { ROLES } from './constants';

class Auth {
  constructor() {
    this.authenticated = false;
    this.role = undefined;
  }

  login(cb, role) {
    this.authenticated = true;
    this.role = role;
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
}

export default new Auth();
