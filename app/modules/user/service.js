class UserService {
  constructor($q, $firebaseAuth, $http) {
    this._$q = $q;
    this._$http = $http;

    this.ref = new Firebase("https://easy-recipe-app.firebaseio.com/");
    this.auth = $firebaseAuth(this.ref);
  }

  isLoggedIn() {
    return this.auth.$requireAuth();
  }

  logout() {
    this.auth.$unauth();
  }

  login(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$authWithPassword(user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        reject(error);
      });
    });
  }

  new() {
    return {
      email: "",
      password: ""
    }
  }

  create(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$createUser(user)
      .then((response) => {
        this.user = response;
        return this.auth.$authWithPassword(user);
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
    });
  }

  recipe(url) {
    return new this._$q((resolve, reject) => {

    let splitUrl = url.split("/");
    splitUrl[2] = "aqueous-castle-96746.herokuapp.com";
    url = splitUrl.join("/")

    this._$http
      .get(url)
      .then((response) => {
        let recipe = {};

        let el = document.createElement('div');
        el.innerHTML = response.data;

        let instructions = el.querySelector("#instructions");
        recipe.title = el.querySelector(".main-title").textContent;

        let steps = instructions.querySelectorAll(".instr-step");

        Array.from(steps).forEach((step) => {
          let title = step.querySelector('.instr-title').textContent
          console.log(title);
          let action = step.querySelector('p').textContent.split(".")
          console.log(action);
          let time = step.querySelector('p').textContent.slice("minutes")
          console.log(time);
        });

        resolve(recipe);
      })
        .catch(error => {
          console.error(error);
        })
  });
  }
}

export default UserService;
