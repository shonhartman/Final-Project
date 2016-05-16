import angular from 'angular';
import uiRouter from 'angular-ui-router';
import duScroll from 'angular-scroll';
import toastr from 'angular-toastr';

import firebase from 'firebase';
import angularFire from 'angularfire';

import user from './modules/user';
import recipes from './modules/recipes';

let App = angular.module('app', [
  'ui.router',
  'firebase',
  'duScroll',
  'toastr',

  'app.user',
  'app.recipe'
]);

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}

App.config(config);

App.filter('timecode', function() {
  return function(seconds) {
    seconds = Number.parseFloat(seconds);

    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);
    var remainingSeconds = wholeSeconds % 60;

    var output = minutes + ':';

    if(remainingSeconds < 10) {
      output += '0';
    }

    output += remainingSeconds;

    return output;
  }
});
