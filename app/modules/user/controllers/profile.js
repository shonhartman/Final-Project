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

  recipe() {
    this._UserService.recipe();
    this._$state.go("recipe");
  }

  logout() {
    this._UserService.logout();
    this._$state.go("login");
  }
}

export default ProfileController;
