class ProfileController {
  constructor($state, UserService, RecipeService, $http) {
    this._$http = $http;
    this._$state = $state;
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    this.recipeUrl = "https://www.blueapron.com/recipes/middle-eastern-chicken-chickpea-stew-with-cilantro-chermoula-pita-croutons";

    this.weeklyRecipeUrl = "https://aqueous-castle-96746.herokuapp.com/cookbook/all/all/Last%20week"

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

    this.setLastWeek();
  }

  setNextWeek() {
    this.weeklyRecipeUrl = "https://aqueous-castle-96746.herokuapp.com/cookbook/all/all/Next%20Week"
    this.getCurrentRecipes();
  }

  setCurrentWeek() {
    this.weeklyRecipeUrl = "https://aqueous-castle-96746.herokuapp.com/cookbook/all/all/This%20Week"
    this.getCurrentRecipes();
  }

  setLastWeek() {
    this.weeklyRecipeUrl = "https://aqueous-castle-96746.herokuapp.com/cookbook/all/all/Last%20week"
    this.getCurrentRecipes();
  }

  getCurrentRecipes() {
    this._$http
      .get(this.weeklyRecipeUrl)
      .then((response) => {
        console.log("request back");
        let recipes = [];

        let el = document.createElement('div');
        el.innerHTML = response.data;

        let recipeThumbs = el.querySelectorAll(".recipe-thumb");

        Array.from(recipeThumbs).forEach((thumb) => {
          let newRecipe = {
            title: "",
            subtitle: "",
            url: "",
            image: ""
          };

          let url = thumb.querySelector('a').href;
          let splitUrl = url.split("/");
          splitUrl[2] = "aqueous-castle-96746.herokuapp.com";
          url = splitUrl.join("/")

          newRecipe.url = url;
          newRecipe.image = thumb.querySelector('.img-flex').src;
          newRecipe.title = thumb.querySelector('h3').textContent;
          newRecipe.subtitle = thumb.querySelector('h6').textContent;

          recipes.push(newRecipe);
        });

        this.currentRecipes = recipes;
        console.log(this.currentRecipes);
      })
      .catch(error => {
        console.error(error);
      })
  }

  recipe(url) {
    this._UserService.recipe(url)
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
