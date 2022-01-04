class Auth {
  constructor() {
    this.authenticated = false;
    this.role = undefined;
  }

  login(cb, role) {
    this.auth = true;
    this.role = role;
    cb();
  }

  logout(cb) {
    this.auth = false;
    this.role = undefined;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
