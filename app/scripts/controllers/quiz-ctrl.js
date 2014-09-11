'use strict';

/**
 * @ngdoc function
 * @name Quizzer.controller:QuizCtrl
 * @description
 * # QuizCtrl
 * Controller of the Quizzer
 */
angular.module('Quizzer')
    .controller('QuizCtrl', ['$scope', '$sce', '$ionicLoading', '$ionicModal', '$ionicScrollDelegate', '$log', 'QuizService', function ($scope, $sce, $ionicLoading, $ionicModal, $ionicScrollDelegate, $log, QuizService) {
        $scope.question = {
            responses: []
        };
        $scope.quiz = {};
        $scope.responseData = -1;
        $scope.result = {};

        $scope.onError = function (error) {
            $scope.modal.show().then(function () {
                $scope.result = error;
                $scope.responseData = -1;
            });
        };

        QuizService.makeQuiz().then(
            function (data) {
                $scope.quiz = data;
                QuizService.start().then(
                    function (data) {
                        $scope.question = data;
                    }, $scope.onError);

            }, $scope.onError);

        $scope.responseChange = function (data) {
            $scope.responseData = data;
        };

        $scope.next = function () {
            QuizService.next().then(
                function (data) {
                    $scope.modal.hide().then(function () {
                        $scope.question = data;
                    });

                }, $scope.onError);
        };

        $scope.validate = function () {
            $log.debug($scope.responseData);
            QuizService.validate($scope.responseData).then(
                function (data) {
                    $scope.result = data;
                    $scope.modal.show().then(function () {
                        $ionicScrollDelegate.$getByHandle('score').scrollTop();
                    });
                }, $scope.onError);

        };
        $scope.SkipValidation = function (value) {
            return $sce.trustAsHtml(value);
        };
        // IONIC Popup Score
        $ionicModal.fromTemplateUrl('templates/modal/score.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });


    }]
);
