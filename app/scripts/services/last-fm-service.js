'use strict';


angular.module('Quizzer')
    .factory('LastFmService', ['$rootScope', '$http', '$q', '$log', 'StringService', function ($rootScope, $http, $q, $log, StringService) {
        var SECRET = '51cff745760bbb447b763e95cd5c0c62',
            apiUrl = 'http://ws.audioscrobbler.com/2.0/?method={1}&artist={2}&api_key={0}&format=json&lang=fr';

        // Public API here
        return {
            getData: function (method, query) {
                var deferred = $q.defer(),
                    lfUrl = StringService.substitute(apiUrl, SECRET, method, query);
                $http({
                    url: lfUrl,
                    method: 'GET'
                }).success(function (resp) {
                    deferred.resolve(resp.artist);
                });
                return deferred.promise;
            }
        };
    }]);
