class ProfileController {
  constructor($state, UserService) {
    this._$state = $state;
    this._UserService = UserService;

    this._UserService
    .isLoggedIn()
    .then((response) => {
      this.user = response;
    })

    .catch((error) => {
      this._$state.go("login");
    });
  }

  logout() {
    this._UserService.logout();
    this._$state.go("login");
  }
}

export default ProfileController;
