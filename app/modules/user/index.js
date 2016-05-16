import angular from 'angular';

import config from './config';
import profileController from './controllers/profile';
import loginController from './controllers/login';
import registerController from './controllers/register';
import recipeController from './controllers/recipe';
import service from './service';

let user = angular.module('app.user', []);

user.config(config);
user.controller('ProfileController', profileController);
user.controller('LoginController', loginController);
user.controller('RegisterController', registerController);
user.controller('RecipeController', recipeController);
user.service('UserService', service);

export default user
