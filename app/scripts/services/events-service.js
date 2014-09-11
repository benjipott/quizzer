'use strict';

angular.module('Quizzer')
    .factory('EventsService', function () {

        var EVENT_LIST = {
            USER_CHANGE: 'userChange',
            LOGOUT: 'UserLogout',
            ARTIST_LIST: 'getArtistList'
        };

        // Public API here
        return {
            list: function () {
                return EVENT_LIST;
            }
        };
    });
