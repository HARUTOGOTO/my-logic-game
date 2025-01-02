"use strict";
// src/game/GameEngine.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEngine = void 0;
const Command_1 = require("./Command");
class GameEngine {
    constructor(player, map) {
        this.commands = [];
        this.commandPointer = 0; // 現在のコマンドインデックス
        this.isRunning = false;
        // LOOP_START のコマンド位置をスタックで管理
        // 繰り返し回数が終わるたびに LOOP_START の位置に戻るなど
        this.loopStack = [];
        // 実行速度の調整用
        this.executionDelay = 300; // デフォルトで 300ms (例)
        this.player = player;
        this.map = map;
    }
    /**
     * プレイヤーが組み立てたコマンド群を受け取る
     */
    setCommands(commands) {
        this.commands = commands;
        this.commandPointer = 0;
    }
    /**
     * 実行開始
     */
    start() {
        this.isRunning = true;
        this.executeNextCommand();
    }
    /**
     * 実行停止
     */
    stop() {
        this.isRunning = false;
    }
    /**
     * リセット
     */
    reset() {
        this.stop();
        this.commandPointer = 0;
        this.player.resetPosition();
        // もしステージ上のアイテム状態もリセットしたい場合は、
        // this.map.resetItems() などの処理を呼び出す。
    }
    /**
     * コマンドを1つずつ実行するループ。
     * （実際には setTimeout や requestAnimationFrame などで
     * 　タイミングをコントロールして呼び出す）
     */
    executeNextCommand() {
        var _a;
        if (!this.isRunning)
            return;
        // すべてのコマンドを実行し終えたらゴール判定へ
        if (this.commandPointer >= this.commands.length) {
            this.checkGoalCondition();
            return;
        }
        // 現在のコマンドを取り出して処理
        const command = this.commands[this.commandPointer];
        switch (command.type) {
            case Command_1.CommandType.FORWARD:
                this.player.moveForward();
                break;
            case Command_1.CommandType.TURN_LEFT:
                this.player.turnLeft();
                break;
            case Command_1.CommandType.TURN_RIGHT:
                this.player.turnRight();
                break;
            case Command_1.CommandType.LOOP_START:
                // LOOP_START のインデックスをスタックにpush
                this.loopStack.push(this.commandPointer);
                break;
            case Command_1.CommandType.LOOP_END:
                // スタックから LOOP_START の位置を取得
                const loopStartIndex = this.loopStack.pop();
                if (loopStartIndex !== undefined && command.args && command.args.count > 1) {
                    // ループ回数がまだ残っていれば、もう一度 LOOP_START に戻る
                    command.args.count -= 1;
                    this.loopStack.push(loopStartIndex);
                    this.commandPointer = loopStartIndex;
                }
                break;
            case Command_1.CommandType.IF_COLOR:
                // 例えばマスの色を判定して分岐する
                const targetColor = (_a = command.args) === null || _a === void 0 ? void 0 : _a.color;
                if (this.map.getTileColor(this.player.x, this.player.y) !== targetColor) {
                    // 色が違う場合、次の1コマンドをスキップ
                    this.commandPointer += 1;
                }
                break;
            default:
                console.warn("Unknown command:", command.type);
                break;
        }
        // プレイヤーがそのマスに到達したタイミングでアイテム取得判定
        this.map.checkAndCollectItem(this.player.x, this.player.y);
        // 次のコマンドに進める
        this.commandPointer++;
        // 一定の時間を置いてから次のコマンドを実行
        // (演出が必要ならsetTimeoutの時間を大きくしたり、アニメを挟むなど)
        setTimeout(() => {
            this.executeNextCommand();
        }, this.executionDelay);
    }
    /**
     * ゴール条件（アイテムを全て取ったか）のチェック
     */
    checkGoalCondition() {
        if (this.map.allItemsCollected()) {
            console.log("ステージクリア!");
            // ここでクリア演出や画面切り替えなど
            this.stop();
        }
        else {
            console.log("コマンド終了、しかしアイテム未収集あり。");
            // 続行するのかリトライするのかは設計次第
        }
    }
    /**
     * スライダーなどから速度を調整するためのメソッド
     * 例: speed = 1 ~ 10 の値を受け取り、値が大きいほど動作が速い。
     */
    setExecutionSpeed(speed) {
        this.executionDelay = 1000 / speed; // 1なら1秒間隔、10なら0.1秒間隔 など
    }
}
exports.GameEngine = GameEngine;
