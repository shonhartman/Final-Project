class RecipeController {
  constructor(RecipeService, UserService, $stateParams, $interval) {
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    this._$interval = $interval;

    this.sound = new buzz.sound("assets/audio/buzz.mp3", {
      formats: ["mp3"],
      preload: true
    });

    this._UserService
    .isLoggedIn()
    .then((response) => {
      this.user = response;
      RecipeService.get(this.user, $stateParams.id)
        .then((response) => {
          console.log(response);
          this.recipe = response;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      this.$state.go("login");
    });
  }

  startTime(action) {
    console.log("clicked start");
   action.timerRunning = true;

   action.time = this._$interval(() => {
     action.timeLeft--;
     if (action.timeLeft <= 0) {
       action.timerRunning = false;
       this._$interval.cancel(action.time);
       this.sound.play();
     }
   }, 1000);
 }

 stopTime(action) {
   action.timerRunning = false;
   this._$interval.cancel(action.time);
 }

 resetTime(action) {
   action.timerRunning = false;
   action.timeLeft = action.minutes * 60;
 }
}

export default RecipeController;
