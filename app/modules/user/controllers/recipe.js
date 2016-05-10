class RecipeController {
  constructor($http, $scope, $interval) {
    this._$http = $http;
    $scope.timeLeft = 300;

//timer/////////////////////////////////////////////////
    $scope.startTime = function() {
      $scope.disabled = true;
    }

    time = $interval(function() {
      $scope.timeLeft--;
      if($scope.timeLeft <= 0) {
        $scope.disabled = true;
        $interval.cancel(time);
        sound.play();
      }
    }, 1000);

  $scope.stopTime = function() {
    $scope.disabled = false;

    $interval.cancel(time);
  }

  $scope.resetTime = function() {
    $scope.disabled = false;

    $scope.timeLeft = 300;
  }

  timer.filter('timecode', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    remainingSeconds = wholeSeconds % 60;

    output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});
//////////////////////////////////////////////////////////////

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
      })
        .catch(error => {
          console.error(error);
        })

  }
}


export default RecipeController;
