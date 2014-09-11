'use strict';

/**
 * @ngdoc directive
 * @name Quizzer.directive:player
 * @description
 * # player
 */
angular.module('Quizzer')
    .directive('playerManager', ['$timeout', function ($timeout) {
        return {
            templateUrl: 'templates/player.html',
            restrict: 'E',
            scope: {
                cover: '='
            },
            link: function postLink(scope, element) {
                var countBack = element.find('co-content');

                scope.$watch('cover', function (newValue, oldValue) {
                    countBack.css('background-image', 'url(' + newValue + ')');
                });

                scope.position = 0;
                scope.duration = 0;
                scope.progress = 0;
                scope.$on('currentTrack:position', function (event, data) {
                    $timeout(function () {
                        scope.$apply(function () {
                            scope.position = Math.round(data);
                            scope.progress = Math.round(scope.duration / 1000 - scope.position / 1000);
                        });
                    }, 0);
                });
                scope.$on('currentTrack:duration', function (event, data) {
                    var timer = Math.round(data) - 1;
                    scope.duration = Math.min(Math.max(0, timer), timer);

                });
            }
        };
    }]);
