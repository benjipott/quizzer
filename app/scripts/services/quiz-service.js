'use strict';

angular.module('Quizzer')
    .factory('QuizService', ['$rootScope', '$q', '$ionicLoading', 'DeezerService', 'LastFmService', 'angularPlayer', function ($rootScope, $q, $ionicLoading, DeezerService, LastFmService, angularPlayer) {
        // Public API here
        var questionId,
            currentQuiz,
            currentQuestion,
            trackId,
            ERROR_MESSAGE = {
                theme: 'assertive',
                message: 'Mauvaise réponse'
            },
            GOOD_MESSAGE = {
                theme: 'light',
                message: 'Bravo,bonne réponse'
            },

            Question = function (data) {
                this.id = data.id;
                this.preview = data.preview;
                this.title = 'Quel est l\'interprete ? '//data.title;
                this.responses = [];
                this.album = data.album;
                this.artist = data.artist;
            },


            Quiz = function (data) {
                this.questions = makeQuestions(data);
            },

        /* Create an array with two of each tileName in it */
            makeQuestions = function (data) {
                var requestList = [];
                angular.forEach(data, function (value) {
                        requestList.push(new Question(value, 1));
                    }
                );

                return requestList;
            };

        return {
            makeQuiz: function () {
                var deferred = $q.defer();
                DeezerService.editorial(85).then(function (data) {
                    currentQuiz = new Quiz(data);
                    deferred.resolve(currentQuiz);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },

            start: function (id) {
                var deferred = $q.defer();

                $ionicLoading.show({
                    template: 'Loading...',
                    noBackdrop: true
                });

                questionId = id | 0;

                currentQuestion = currentQuiz.questions[questionId];
                trackId = angularPlayer.addTrack({
                    url: currentQuestion.preview,
                    id: currentQuestion.id
                });

                DeezerService.artist(currentQuestion.artist.id, 'related').then(function (data) {
                    currentQuestion.responses = data;
                    currentQuestion.responses.push(currentQuestion.artist);

                    LastFmService.getData('artist.getinfo', currentQuestion.artist.name).then(function (data) {
                        angular.extend(currentQuestion.artist, data);
                        angularPlayer.initPlayTrack(trackId);
                    }, function (err) {
                        angularPlayer.initPlayTrack(trackId);
                    });

                    $rootScope.$on('music:isPlaying', function (event, data) {
                        if (data) {
                            $ionicLoading.hide();
                            deferred.resolve(currentQuestion);
                        }
                    });


                }, function (error) {
                    $ionicLoading.hide();
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            next: function () {
                currentQuestion.responses = [];
                return this.start(questionId += 1);
            },
            validate: function (data) {
                var deferred = $q.defer();
                angularPlayer.stop();

                if (data.id == currentQuestion.artist.id) {
                    deferred.resolve(GOOD_MESSAGE);
                }
                else {
                    $ionicLoading.hide();
                    deferred.reject(ERROR_MESSAGE);
                }
                return deferred.promise;
            }
        };
    }]);
