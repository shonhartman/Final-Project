function config($stateProvider) {
  $stateProvider
  .state("recipe", {
    url:"/recipes/:id",
    controller: "RecipeController as recipeCtrl",
    template: require("./recipe.html")
  })
}

export default config;
