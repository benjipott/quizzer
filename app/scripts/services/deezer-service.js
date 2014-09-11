'use strict';

angular.module('Quizzer')
    .factory('DeezerService', ['$rootScope', '$q', '$log', '$http', 'EventsService', 'StringService', function ($rootScope, $q, $log, $http, EventsService, StringService) {
        var EVENT_LIST = EventsService.list(),
            user_data = {},
            APP_ID = '106131',
            apiUrl = 'http://api.deezer.com/{0}/{1}/{2}?limit={3}&output=jsonp&callback=JSON_CALLBACK',
            DZ = {
                api: function () {
                },
                init: function () {
                },
                logout: function () {
                },
                getLoginStatus: function () {
                    return {
                        userID: '',
                        authResponse: {
                            accessToken: ''
                        }
                    }
                }
            };
        var _displayStatus = function () {
            $rootScope.$broadcast(EVENT_LIST.USER_CHANGE, user_data);
            return true;
        }

        var _setRootData = function (response) {
            user_data = {
                "access_token": response.authResponse.accessToken,
                "user_id": response.userID
            };

            DZ.api('user/me', function (user) {
                angular.extend(user_data, {"email": user.email, "name": user.name, "picture": user.picture});
                _displayStatus();
            });

            return true;
        };

        var _logout = function () {
            user_data = null;
            // broadcast event when DZ calls ends
            $rootScope.$broadcast(EVENT_LIST.LOGOUT, user_data);
            return true;
        };

        // Public API here
        return {
            checked_logged: function () {
                var deferred = $q.defer();

                DZ.getLoginStatus(function (resp) {
                    if (resp.authResponse != null) {
                        _setRootData(resp);
                        deferred.resolve(resp);
                    }
                    else {
                        deferred.reject(resp);
                    }
                });
                return deferred.promise;
            },
            getData: function () {
                Array.prototype.unshift.call(arguments, apiUrl);

                var deferred = $q.defer(),
                    lfUrl = StringService.substitute.apply(this, arguments);

                $http({
                    url: lfUrl,
                    method: 'JSONP'
                }).success(function (resp, status) {
                    deferred.resolve(resp, status);
                }).error(function (error, status) {
                    deferred.reject(error, status);
                });
                /*$http.jsonp(lfUrl).success(function (resp) {
                 deferred.resolve(resp);
                 }).error(function (error) {
                 deferred.reject(error);
                 });*/
                return deferred.promise;
            },
            editorial: function (id) {
                var deferred = $q.defer();

                /*DZ.api('/editorial/' + id + '/charts', 'GET', {limit: 16}, function (resp) {
                 deferred.resolve(resp.tracks.data);
                 });*/

                this.getData('editorial', id, 'charts', 16).then(
                    function (reponse) {
                        deferred.resolve(reponse.tracks.data);
                    }, function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            },
            artist: function (id, type) {
                var deferred = $q.defer();
                type = type || 'related';

                /*DZ.api('/artist/' + id + '/' + type, 'GET', {limit: 3}, function (resp) {
                 deferred.resolve(resp.data);
                 });*/
                this.getData('artist', id, type, 3).then(
                    function (reponse) {
                        deferred.resolve(reponse.data);
                    }, function (error) {
                        deferred.reject(error);
                    }
                );
                return deferred.promise;

            },
            search: function (query) {
                DZ.api('/search/artist', 'GET', {q: query, order: 'ARTIST_ASC'}, function (resp) {
                    var searchResuls = resp.data ? resp.data : [];
                    $rootScope.$broadcast(EVENT_LIST.ARTIST_LIST, searchResuls);
                });
            },
            login: function () {
                var deferred = $q.defer();
                DZ.login(function (response) {
                    DZ.getLoginStatus(function (resp) {
                        if (resp.authResponse != null) {
                            _setRootData(resp);
                            deferred.resolve(resp.data);
                        }
                        else {
                            deferred.reject(resp);
                        }
                    });
                }, {perms: 'basic_access,email,offline_access,manage_library'});

                return deferred.promise;
            },
            play: function (idTrack) {
                DZ.player.playTracks([idTrack]);
            },
            playPreview: function (preview) {
                $rootScope.localPlayer.load({
                    src: preview,
                    type: 'audio/mp3'
                }, 1);
            },
            logout: function () {
                DZ.logout();
                _logout();
            },
            init: function () {
                DZ.init({
                    appId: APP_ID,
                    channelUrl: 'http://benjipott.fr:9000/channel.html'
                });
            }
        };
    }]);
