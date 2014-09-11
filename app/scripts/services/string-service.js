'use strict';

angular.module('Quizzer')
    .factory('StringService', function () {
        // Public API here
        return {
            substitute: function () {
                var theString = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                    theString = theString.replace(regEx, arguments[i]);
                }

                return theString;
            }
        };
    });


