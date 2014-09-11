'use strict';
angular.module('Quizzer')
    .directive('blurred', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            template: '<canvas id="{{ itemId }}"></canvas>',
            scope: {
                src: '@'
            },
            link: function (scope, element, attrs) {
                scope.itemId = "canvas_" + parseInt(Math.random() * 1000000000);

                var radiusCanvas = function (img, ctx, x, y, w, h, cr) {

                    //ctx.clearRect(0, 0, w, h);

                    ctx.fillStyle = ctx.createPattern(img, "repeat");
                    ctx.fillRect(x + (cr / 2), y + (cr / 2), w - cr, h - cr);

                    ctx.beginPath();
                    ctx.moveTo(x + cr, y);
                    ctx.lineTo(x + w - cr, y);
                    ctx.quadraticCurveTo(x + w, y, x + w, y + cr);
                    ctx.lineTo(x + w, y + h - cr);
                    ctx.quadraticCurveTo(x + w, y + h, x + w - cr, y + h);
                    ctx.lineTo(x + cr, y + h);
                    ctx.quadraticCurveTo(x, y + h, x, y + h - cr);
                    ctx.lineTo(x, y + cr);
                    ctx.quadraticCurveTo(x, y, x + cr, y);
                    ctx.closePath();
                    ctx.fill();

                };

                function blurCanvas(img, canvas, radius, blurAlphaChannel) {

                    var w = img.naturalWidth;
                    var h = img.naturalHeight;

                    var context = canvas.getContext("2d");

                    context.clearRect(0, 0, w, h);
                    context.drawImage(img, 0, 0);

                    if (isNaN(radius) || radius < 1) return;

                    if (blurAlphaChannel)
                        stackBlurCanvasRGBA(canvas.id, 0, 0, w, h, radius);
                    else
                        stackBlurCanvasRGB(canvas.id, 0, 0, w, h, radius);

                    return context;
                }

                var fillCanvas = function () {
                    if (!scope.src)
                        return;

                    var el_ = element[0],
                        context = null,
                        img = new Image() //create a new image

                    img.onload = function (e) {
                        context = blurCanvas(img, el_, 10, 0);
                        radiusCanvas(img, context, 0, 0, e.target.width, e.target.height);
                    };

                    img.crossOrigin = 'anonymous';
                    img.src = scope.src

                };
                scope.$watch('src', function () { //watch for a change in the src File to update de background image
                    fillCanvas();
                });
            }
        }
    }]);