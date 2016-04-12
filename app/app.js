'use strict';

/**
 * @ngdoc overview
 * @name succeedIT
 * @description
 * # succeedIT
 *
 * Main module of the application.
 */
angular
  .module('succeedIT', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('projects');
            }, function(error){
              return;
            });
          }
        }        
      })
      .state('projects', {
        url: '/projects',
        controller: 'ProjectsCtrl as projectsCtrl',
        templateUrl: 'projects/index.html',        
        resolve: {
          projects: function (Projects){
            return Projects.$loaded();
          },          
          profile: function ($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })    
      .state('projects.create', {
        url: '/create',
        templateUrl: 'projects/create.html',
        controller: 'ProjectsCtrl as projectsCtrl'
      })       
      .state('projects.messages', {
        url: '/{projectId}/messages',
        templateUrl: 'projects/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',        
        resolve: {
          messages: function($stateParams, Messages){
            return Messages.forProject($stateParams.projectId).$loaded();
          },
          projectName: function($stateParams, projects){
            return '#'+projects.$getRecord($stateParams.projectId).name;
          }
        }
      }) 
      .state('projects.dashboard', {
        url: '/{projectId}/dashboard',
        templateUrl: 'projects/dashboard.html',
        controller: 'DashboardCtrl as dashboardCtrl',        
        resolve: {
          messages: function($stateParams, Messages){
            return Messages.forProject($stateParams.projectId).$loaded();
          },
          projectName: function($stateParams, projects){
            return '#'+projects.$getRecord($stateParams.projectId).name;
          }
        }
      })
      .state('projects.team', {
        url: '/{projectId}/team',
        templateUrl: 'projects/dashboard.html',
        resolve: {
          availableUsers: function($stateParams, Users){

          }
        }

      })      
      .state('projects.direct', {
        url: '/{uid}/messages/direct',
        templateUrl: 'projects/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
          messages: function($stateParams, Messages, profile){
            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
          },
          projectName: function($stateParams, Users){
            return Users.all.$loaded().then(function(){
              return '@'+Users.getDisplayName($stateParams.uid);
            });
          }
        }        
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })      
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }        
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }        
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://succeed-it.firebaseio.com/');
