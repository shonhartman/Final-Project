class RecipeController {
  constructor($http) {
    this._$http = $http;
  }

  scrape() {
    console.log("scraping");
        this._$http({
          method: "GET",
          url: `https://aqueous-castle-96746.herokuapp.com/recipes/middle-eastern-chicken-chickpea-stew-with-cilantro-chermoula-pita-croutons`
        })
      .then(response => {
         let el = document.createElement('div');
          el.innerHTML = response.data;

          let title = el.querySelector(".main-title");
          console.log(title.textContent);

      })
        .catch(error => {
          console.error(error);
        })

  }
}

export default RecipeController;
