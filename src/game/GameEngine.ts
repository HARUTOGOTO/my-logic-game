// src/game/GameEngine.ts

import { ICommand, CommandType } from "./Command";
import { Player } from "./Player";
import { GameMap } from "./Map";

export class GameEngine {
  private commands: ICommand[] = [];
  private commandPointer: number = 0; // 現在のコマンドインデックス
  private isRunning: boolean = false;
  private player: Player;
  private map: GameMap;

  // LOOP_START のコマンド位置をスタックで管理
  // 繰り返し回数が終わるたびに LOOP_START の位置に戻るなど
  private loopStack: number[] = []; 

  // 実行速度の調整用 (ms)
  private executionDelay: number = 300; // デフォルトで300ms(例)

  // 追加したいコールバック（フック）
  // "executeNextCommand" が1ステップ進むたびに呼ばせる仕組み
  public onAfterCommand?: () => void;

  constructor(player: Player, map: GameMap) {
    this.player = player;
    this.map = map;
  }

  /**
   * プレイヤーが組み立てたコマンド群を受け取る
   */
  public setCommands(commands: ICommand[]) {
    this.commands = commands;
    this.commandPointer = 0;
  }

  /**
   * 実行開始
   */
  public start() {
    this.isRunning = true;
    this.executeNextCommand();
  }

  /**
   * 実行停止
   */
  public stop() {
    this.isRunning = false;
  }

  /**
   * リセット
   */
  public reset() {
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
  private executeNextCommand(): void {
    if (!this.isRunning) return;

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
            command.args.count -= 1;  // カウントをデクリメント
            this.loopStack.push(loopStartIndex);
            this.commandPointer = loopStartIndex;
          }
        }
        break;

      case CommandType.IF_COLOR:
        {
          const targetColor = command.args?.color;
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
  private checkGoalCondition(): void {
    if (this.map.allItemsCollected()) {
      console.log("ステージクリア!");
      this.stop();
    } else {
      console.log("コマンド終了、しかしアイテム未収集あり。");
      // リトライするかどうかは設計次第
    }
  }

  /**
   * スライダーなどから速度を調整するためのメソッド
   * speed=1~10 (1で遅い、10で速い)等
   */
  public setExecutionSpeed(speed: number): void {
    this.executionDelay = 1000 / speed; 
  }
}
