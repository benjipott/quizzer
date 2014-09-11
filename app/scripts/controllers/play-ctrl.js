'use strict';
angular.module('Quizzer')
    .controller('PlayCtrl', ['$scope', 'GameService', 'DeezerService', 'angularPlayer', function ($scope, GameService, DeezerService, angularPlayer) {
        $scope.currentCard = {};
        $scope.game = DeezerService.editorial(85).then(function (data) {
            $scope.game = GameService.makeGame(data);
        }, function (error) {
            $scope.game = null;
        });
        $scope.lunch = function (carte) {
            $scope.game.flipTile(carte);
            var trackId = angularPlayer.addTrack({
                url: carte.preview,
                id: carte.id
            });
            $scope.currentCard = carte;

            angularPlayer.initPlayTrack(trackId);

        }
    }]);