function config($stateProvider) {
  $stateProvider
  .state("profile", {
    url:"/",
    controller: "ProfileController as profileCtrl",
    template: require("./views/profile.html")
  })
  .state("login", {
    url:"/login",
    controller: "LoginController as loginCtrl",
    template: require("./views/login.html")
  })
  .state("register", {
    url:"/register",
    controller: "RegisterController as registerCtrl",
    template: require("./views/register.html")
  })
}


export default config;
