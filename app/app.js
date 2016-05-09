import angular from 'angular';
import uiRouter from 'angular-ui-router';
import duScroll from 'angular-scroll';

import firebase from 'firebase';
import angularFire from 'angularfire';

import user from './modules/user';
import recipes from './modules/recipes';

let App = angular.module('app', [
  'ui.router',
  'firebase',
  'duScroll',

  'app.user',
  'app.recipe'
]);

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}

App.config(config);
