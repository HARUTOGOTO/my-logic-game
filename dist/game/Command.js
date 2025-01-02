// src/game/Command.ts
/**
 * コマンドの種類を列挙
 */
export var CommandType;
(function (CommandType) {
    CommandType["FORWARD"] = "FORWARD";
    CommandType["TURN_LEFT"] = "TURN_LEFT";
    CommandType["TURN_RIGHT"] = "TURN_RIGHT";
    CommandType["LOOP_START"] = "LOOP_START";
    CommandType["LOOP_END"] = "LOOP_END";
    CommandType["IF_COLOR"] = "IF_COLOR";
    // さらに必要なら追加 ...
})(CommandType || (CommandType = {}));
