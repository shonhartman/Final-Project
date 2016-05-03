import angular from 'angular';

import config from './config';
import recipeController from './controller';
import service from './service';

let recipe = angular.module('app.recipe', []);

recipe.config(config);
recipe.controller('RecipeController', recipeController);
recipe.service('RecipeService', service);

export default recipe;
