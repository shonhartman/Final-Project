class RecipeController {
  constructor(RecipeService, UserService) {
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    this.recipe = RecipeService.new();

    this._UserService
    .isLoggedIn()
    .then((response) => {
      this.user = response;
      this.recipes = RecipeService.login(response);
    })

    .catch((error) => {
      this.$state.go("login");
    });
  }

  addRecipe() {
    this._RecipeService.addRecipe(this.recipe);
    this.recipe = this._RecipeService.new();
  }
}

export default RecipeController;
