"use strict";
// src/game/Command.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = void 0;
/**
 * コマンドの種類を列挙
 */
var CommandType;
(function (CommandType) {
    CommandType["FORWARD"] = "FORWARD";
    CommandType["TURN_LEFT"] = "TURN_LEFT";
    CommandType["TURN_RIGHT"] = "TURN_RIGHT";
    CommandType["LOOP_START"] = "LOOP_START";
    CommandType["LOOP_END"] = "LOOP_END";
    CommandType["IF_COLOR"] = "IF_COLOR";
    // さらに必要なら追加 ...
})(CommandType || (exports.CommandType = CommandType = {}));
