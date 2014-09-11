'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Quizzer', [
    'ionic',
    'ngTouch',
    'ngSanitize',
    'angular-loading-bar',
    'angularSoundManager',
    'Orbicular'
])

    .run(['$ionicPlatform', function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.play', {
                url: '/play',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/play.html',
                        controller: 'PlayCtrl'
                    }
                }
            })
            .state('app.quiz', {
                url: '/quiz',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/quiz.html',
                        controller: 'QuizCtrl'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/quiz');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.interceptors.push('LoginInterceptor');
    }])
    /*.config(function (RestangularProvider) {
     RestangularProvider.setBaseUrl('https://api.deezer.com/');
     //RestangularProvider.setBaseUrl('config/');
     RestangularProvider.setDefaultHttpFields({
     withCredentials: true,
     useXDomain: true,
     headers: {
     'Content-Type': 'application/json'
     }
     });
     })*/
;

