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

      console.log("request sent");

      this._$http
        .get(url)
        .then((response) => {
          console.log("request back");
          let recipe = {
            steps: []
          };

          let el = document.createElement('div');
          el.innerHTML = response.data;

          let instructions = el.querySelector("#instructions");
          recipe.title = el.querySelector(".main-title").textContent;
          recipe.small = el.querySelector(".sub-title").textContent;

          let steps = instructions.querySelectorAll(".instr-step");

          Array.from(steps).forEach((step) => {
            let newStep = {
              actions: [],
              images: []
            };
            newStep.title = step.querySelector('.instr-title').textContent
            let actions = step.querySelector('p').textContent.split(".")

            actions.forEach((action) => {
              let newAction = {
                text: action,
                minutes: "",
                next_action: newStep.actions.length + 1,
                next_step: recipe.steps.length + 1,
                step: recipe.steps.length
              };
              let matches = /(\d*) to \d* minutes/.exec(action);

              console.log(action);

              if (matches !== null && matches.length > 0) {
                newAction.minutes = matches[1];
                newAction.timeLeft = newAction.minutes * 60;
              }

              if (newAction.text !== "") {
                newStep.actions.push(newAction);
              }
            })

            //get image url///////////////////////////////////
            let images = step.querySelectorAll("img");

            Array.from(images).forEach((image) => {
              newStep.images.push(image.src);
            });
            ////////////////////////////////////////////////////////////

            recipe.steps.push(newStep);
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
