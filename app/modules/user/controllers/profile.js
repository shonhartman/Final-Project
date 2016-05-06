class ProfileController {
  constructor($state, UserService, RecipeService) {
    this._$state = $state;
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    this.recipeUrl = "https://www.blueapron.com/recipes/middle-eastern-chicken-chickpea-stew-with-cilantro-chermoula-pita-croutons";

    this._UserService
    .isLoggedIn()
    .then((response) => {
      this.user = response;
      this.recipes = this._RecipeService.login(this.user);
      console.log(this.recipes);
    })

    .catch((error) => {
      this._$state.go("login");
    });
  }

  recipe() {
    this._UserService.recipe(this.recipeUrl)
      .then((response) => {
        return this._RecipeService.add(response);
      })
      .then((response) => {
        console.log(response);
        this._$state.go("recipe", { id: response.key() });
      });
  }

  logout() {
    this._UserService.logout();
    this._$state.go("login");
  }
}

export default ProfileController;
