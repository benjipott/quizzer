'use strict';
angular.module('Quizzer')
    .controller('AppCtrl', ['$scope', function ($scope) {
        $scope.menuData = [
            //{name: 'Jouer', target: 'play', icon: 'ion-game-controller-a'},
            {name: 'Quiz', target: 'quiz', icon: 'ion-help'}/*,
             {name: 'Editorial', target: 'editorial', icon: 'ion-arrow-graph-up-right'},
             {name: 'Albums', target: 'albums', icon: 'ion-ios7-albums'},
             {name: 'Genre', target: 'genre', icon: 'ion-ios7-paw'},
             {name: 'Infos', target: 'infos', icon: 'ion-ios7-help'},
             {name: 'Mes Playlist', target: 'playlist', icon: 'ion-ios7-filing'}*/
        ];
    }]);