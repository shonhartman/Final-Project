class UserService {
  constructor($q, firebaseAuth) {
    this._$q = $q;

    this.ref = new Firebase("https://easy-recipe-app.firebaseio.com/");
    this.auth = $firebaseAuth(this.ref);
  }

  isLoggedIn() {
    return this.auth.$requireAuth();
  }

  login(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$authWithPassword(user)
      .then(function(authData) {
        console.log("Logged in as:", authData.uid);
        this.user.$save().$state.go("login");
      })

      .catch(function(error) {
        console.error("Authentication failed:", error);
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
        resolve(this.user);
      })

      .catch(function(error) {
        reject(error);
      })
    });
  }
}

export default UserService;
