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
    if (role === 'doctor') this.role = role;
    else this.role = 'patient';
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
    return this.role === 'doctor';
  }
}

export default new Auth();
