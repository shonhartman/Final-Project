class RegisterController {
  constructor($state, UserService) {
    this._$state = $state;
    this._UserService = UserService;
    this.newUser = this._UserService.new();
  }

  register() {
    this._UserService
    .create(this.newUser)
    .then((response) => {
      this._$state.go("profile");
    })
    .catch((error) => {
      console.error(error);
    })
  }
}

export default RegisterController;
