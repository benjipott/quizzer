'use strict';

/**
 * @ngdoc filter
 * @name Quizzer.filter:shuffle
 * @function
 * @description
 * # shuffle
 * Filter in the Quizzer.
 */
angular.module('Quizzer')
    .filter('shuffle', function () {
        var shuffledArr = [],
            shuffledLength = 0;
        return function (arr) {
            if (!arr)
                return [];
            var o = arr.slice(0, arr.length);
            if (shuffledLength == arr.length) return shuffledArr;
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            shuffledArr = o;
            shuffledLength = o.length;
            return o;
        };
    });
