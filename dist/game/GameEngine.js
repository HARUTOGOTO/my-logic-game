// src/game/GameEngine.ts
import { CommandType } from "./Command";
export class GameEngine {
    constructor(player, map) {
        this.commands = [];
        this.commandPointer = 0; // 現在のコマンドインデックス
        this.isRunning = false;
        // LOOP_START のコマンド位置をスタックで管理
        // 繰り返し回数が終わるたびに LOOP_START の位置に戻るなど
        this.loopStack = [];
        // 実行速度の調整用 (ms)
        this.executionDelay = 300; // デフォルトで300ms(例)
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
        // もしステージ上のアイテム状態もリセットしたい場合は this.map.resetItems() など
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
            case CommandType.FORWARD:
                this.player.moveForward();
                break;
            case CommandType.TURN_LEFT:
                this.player.turnLeft();
                break;
            case CommandType.TURN_RIGHT:
                this.player.turnRight();
                break;
            case CommandType.LOOP_START:
                this.loopStack.push(this.commandPointer);
                break;
            case CommandType.LOOP_END:
                {
                    const loopStartIndex = this.loopStack.pop();
                    if (loopStartIndex !== undefined && command.args && command.args.count > 1) {
                        command.args.count -= 1; // カウントをデクリメント
                        this.loopStack.push(loopStartIndex);
                        this.commandPointer = loopStartIndex;
                    }
                }
                break;
            case CommandType.IF_COLOR:
                {
                    const targetColor = (_a = command.args) === null || _a === void 0 ? void 0 : _a.color;
                    if (this.map.getTileColor(this.player.x, this.player.y) !== targetColor) {
                        // 色が違う場合、次の1コマンドをスキップ
                        this.commandPointer += 1;
                    }
                }
                break;
            default:
                console.warn("Unknown command:", command.type);
                break;
        }
        // アイテム取得判定
        this.map.checkAndCollectItem(this.player.x, this.player.y);
        // コマンド実行が終わったので次へ進める
        this.commandPointer++;
        // ★ ここでコールバック（onAfterCommand）を呼ぶ ★
        if (this.onAfterCommand) {
            this.onAfterCommand();
        }
        // 次のコマンドへ進むためのタイマー
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
            this.stop();
        }
        else {
            console.log("コマンド終了、しかしアイテム未収集あり。");
            // リトライするかどうかは設計次第
        }
    }
    /**
     * スライダーなどから速度を調整するためのメソッド
     * speed=1~10 (1で遅い、10で速い)等
     */
    setExecutionSpeed(speed) {
        this.executionDelay = 1000 / speed;
    }
}
