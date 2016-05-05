class RecipeController {
  constructor(RecipeService, UserService, $stateParams) {
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    
    this._UserService
    .isLoggedIn()
    .then((response) => {
      this.user = response;
      RecipeService.get(this.user, $stateParams.id)
        .then((response) => {
          console.log(response);
          this.recipe = response;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      this.$state.go("login");
    });
  }

}

export default RecipeController;
