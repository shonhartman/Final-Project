function config($stateProvider) {
  $stateProvider
  .state("recipe", {
    url:"/recipe",
    controller: "RecipeController as recipeCtrl",
    template: require("./recipe.html")
  })
}

export default config;
