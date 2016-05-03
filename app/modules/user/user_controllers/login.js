class LoginController {
  constructor($state, UserService) {
    this._$state = $state;
    this._UserService = UserService.new();
  }

  login(user) {
    this._UserService
    .login(this.user)
    .then((response) => {
      this.user = response;
      resolve(this.user);
    })
  }
}

export default LoginController;
