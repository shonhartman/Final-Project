class RecipeService {
  constructor($q, $firebaseAuth, $firebaseArray) {
    this._$q = $q;
    this._$firebaseArray = $firebaseArray;
    this.ref = new Firebase("https://easy-recipe-app.firebaseio.com/");
    this.auth = $firebaseAuth(this.ref);
  }

  login(user) {
    this.recipes = this._$firebaseArray(this.ref.child('users').child(user.uid).child('recipes'));
    return this.locations;
  }

  // new() {
  //   return {
  //     img_url: "",
  //     directions: ""
  //   }
  // }

  all() {
    return this.recipe;
  }
}

export default RecipeService;
