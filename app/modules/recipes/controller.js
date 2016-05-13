class RecipeController {
  constructor(RecipeService, UserService, $stateParams, $interval, $window) {
    this._UserService = UserService;
    this._RecipeService = RecipeService;
    this._$interval = $interval;

    this.shareLink = $window.location.href;

    this.sound = new buzz.sound("assets/audio/buzz", {
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
          this.startRecipeTimers();
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      this.$state.go("login");
    });

  }

  startRecipeTimers() {
    this._$interval(() => {
      this.recipe.steps.forEach((step) => {
        step.actions
          .filter((action) => Number(action.minutes) > 0)
          .forEach((action) => {
            if (action.timerRunning) {
              action.timeLeft--;
              if (action.timeLeft <= 0) {
                action.timerRunning = false;
                this.sound.play();
              }
            }
          });
      });

    }, 1000);
  }

  toggleCompleted(action) {
    action.completed = !action.completed;
    this._RecipeService.save();
  }

  startTime(action) {
    action.timerRunning = true;
    this._RecipeService.save();
 }

 stopTime(action) {
   action.timerRunning = false;
   this._RecipeService.save();
 }

 resetTime(action) {
   action.timerRunning = false;
   action.timeLeft = action.minutes * 60;
   this._RecipeService.save();
 }
}

export default RecipeController;
