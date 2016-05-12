class RecipeService {
  constructor($q, $firebaseArray) {
    this._$q = $q;
    this._$firebaseArray = $firebaseArray;
    this.ref = new Firebase("https://easy-recipe-app.firebaseio.com/");
  }


  login(user) {
    this.recipes = this._$firebaseArray(this.ref.child('recipes'));
    // use $loaded()
    return this.recipes;
  }

  get(user, id) {
    return new this._$q((resolve, reject) => {
      this.recipes = this._$firebaseArray(this.ref.child('recipes'));

      this.recipes.$loaded()
        .then((response) => {
          this.recipes = response;
          this.recipe = this.recipes.$getRecord(id);
          resolve(this.recipe);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  add(recipe) {
    return this.recipes.$add(recipe);
  }

  save() {
    this.recipes.$save(this.recipe);
  }


}

export default RecipeService;
