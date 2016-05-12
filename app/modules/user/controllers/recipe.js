class RecipeController {
  constructor($http, $scope, $interval) {
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
          //logic goes here?

          let title = el.querySelector(".main-title");
          console.log(title.textContent);

          let description = el.querySelector(".rec-descrip-details-section")
      })
        .catch(error => {
          console.error(error);
        })
      }
    }


export default RecipeController;
