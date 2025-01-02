"use strict";
// src/game/Player.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (exports.Direction = Direction = {}));
class Player {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.initialX = x;
        this.initialY = y;
        this.initialDirection = direction;
    }
    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.direction = this.initialDirection;
    }
    moveForward() {
        switch (this.direction) {
            case Direction.UP:
                this.y -= 1;
                break;
            case Direction.DOWN:
                this.y += 1;
                break;
            case Direction.LEFT:
                this.x -= 1;
                break;
            case Direction.RIGHT:
                this.x += 1;
                break;
        }
    }
    turnLeft() {
        this.direction = (this.direction + 3) % 4;
        // +3 して4で割った余りを取ると左回転になる
    }
    turnRight() {
        this.direction = (this.direction + 1) % 4;
    }
}
exports.Player = Player;
