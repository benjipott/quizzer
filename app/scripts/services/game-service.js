'use strict';
function Tile(data, isPlayer) {
    this.title = data.title;
    this.id = data.id;
    this.cover = data.album.cover;
    this.preview = data.preview;
    this.flipped = false;
    this.player = isPlayer;
}

Tile.prototype.flip = function () {
    this.flipped = !this.flipped;
}


function Game(tileNames) {
    var tileDeck = makeDeck(tileNames);

    this.grid = makeGrid(tileDeck);
    this.message = Game.MESSAGE_CLICK;
    this.unmatchedPairs = tileNames.length;

    this.flipTile = function (tile) {
        if (tile.flipped) {
            return;
        }

        tile.flip();

        if (!this.firstPick || this.secondPick) {

            if (this.secondPick) {
                this.firstPick.flip();
                this.secondPick.flip();
                this.firstPick = this.secondPick = undefined;
            }

            this.firstPick = tile;
            this.message = Game.MESSAGE_ONE_MORE;

        } else {

            if (this.firstPick.title === tile.title) {
                this.unmatchedPairs--;
                this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.MESSAGE_WON;
                this.firstPick = this.secondPick = undefined;
            } else {
                this.secondPick = tile;
                this.message = Game.MESSAGE_MISS;
            }
        }

    }
}

Game.MESSAGE_CLICK = 'Click on a tile.';
Game.MESSAGE_ONE_MORE = 'Pick one more card.'
Game.MESSAGE_MISS = 'Try again.';
Game.MESSAGE_MATCH = 'Good job! Keep going.';
Game.MESSAGE_WON = 'You win!';


/* Create an array with two of each tileName in it */
function makeDeck(data) {
    var tileDeck = [];
    angular.forEach(data, function (value) {
            tileDeck.push(new Tile(value, 1));
            tileDeck.push(new Tile(value, 0));
        }
    );

    return tileDeck;
}


function makeGrid(tileDeck) {
    var gridDimension = Math.sqrt(Math.min(tileDeck.length, 16)),
        grid = [];

    for (var row = 0; row < gridDimension; row++) {
        grid[row] = [];
        for (var col = 0; col < gridDimension; col++) {
            grid[row][col] = removeRandomTile(tileDeck);
        }
    }

    return grid;
}


function removeRandomTile(tileDeck) {
    var i = Math.floor(Math.random() * tileDeck.length);
    return tileDeck.splice(i, 1)[0];
}

angular.module('Quizzer')
    .factory('GameService', function () {
        // Public API here
        return {
            makeGame: function (list) {
                return new Game(list);
            }
        };
    });
