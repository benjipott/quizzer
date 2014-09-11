'use strict';
angular.module('Quizzer')
    .directive('mgCard', ['$sce', function ($sce) {
        return {
            restrict: 'E',
            templateUrl: 'templates/game/card.html',
            scope: {
                tile: '='
            },
            link: function (scope) {
                scope.getThumbnail = function (url) {
                    return $sce.trustAsResourceUrl(url);
                }
            }
        }
    }]);