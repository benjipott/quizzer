'use strict';

angular.module('Quizzer')
    .factory('LoginInterceptor', ['$log', '$q', 'DeezerService', function ($log, $q, DeezerService) {
        var deferred = $q.defer();

        var onResponse = function (resp) {
            deferred.resolve(resp);
        };

        var onError = function (error) {
            deferred.reject(error);
        };
        var reLog = function (error) {
            DeezerService.login().then(
                onResponse,
                onError
            );
        };
        DeezerService.checked_logged().then(
            onResponse,
            reLog
        );
        return deferred.promise;
    }]);


