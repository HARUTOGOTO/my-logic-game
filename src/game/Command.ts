// src/game/Command.ts

/**
 * コマンドの種類を列挙
 */
export enum CommandType {
  FORWARD = "FORWARD",
  TURN_LEFT = "TURN_LEFT",
  TURN_RIGHT = "TURN_RIGHT",
  LOOP_START = "LOOP_START",
  LOOP_END = "LOOP_END",
  IF_COLOR = "IF_COLOR",  // 色条件分岐
  // さらに必要なら追加 ...
}

/**
 * コマンドのインターフェース
 * - CommandType: コマンドの種類
 * - args: 追加パラメータ（例: ループ回数など）
 */
export interface ICommand {
  type: CommandType;
  args?: any; // ループの回数や判断する色などを持たせる
}
