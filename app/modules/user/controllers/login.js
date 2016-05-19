class LoginController {
  constructor($state, UserService) {
    console.log("login");

    this._$state = $state;
    this._UserService = UserService;
    this.user = this._UserService.new();
  }

  login(user) {
    this._UserService
    .login(this.user)
    .then((response) => {
      this.user = response;
      this._$state.go("profile");
    });
  }

  signUp() {
    this._$state.go("register");
  }
}

export default LoginController;
