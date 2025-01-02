// src/ui/UIManager.ts

import { GameEngine } from "../game/GameEngine";
import { CommandType, ICommand } from "../game/Command";
import { Renderer } from "./Renderer";
import { GameMap } from "../game/Map";
import { Player } from "../game/Player";

export class UIManager {
  private engine: GameEngine;
  private commandList: ICommand[] = [];
  private renderer: Renderer;
  private map: GameMap;
  private player: Player;

  constructor(engine: GameEngine, map: GameMap, player: Player) {
    this.engine = engine;
    this.map = map;
    this.player = player;
    // Renderer の初期化(このMapのサイズに合わせる)
    this.renderer = new Renderer("gameCanvas", map);
  }

  public initUI() {
    // コマンド追加ボタン
    document.getElementById("btnForward")?.addEventListener("click", () => {
      this.addCommand(CommandType.FORWARD);
    });
    document.getElementById("btnLeft")?.addEventListener("click", () => {
      this.addCommand(CommandType.TURN_LEFT);
    });
    document.getElementById("btnRight")?.addEventListener("click", () => {
      this.addCommand(CommandType.TURN_RIGHT);
    });
    document.getElementById("btnF1")?.addEventListener("click", () => {
      // 例: ループ開始/終了をセットするなど、お好みで
      // あるいはF1用の特別コマンドを作る
      this.addCommand(CommandType.LOOP_START, { count: 2 }); // サンプル
    });
    document.getElementById("btnF2")?.addEventListener("click", () => {
      this.addCommand(CommandType.LOOP_END);
    });
    
    // 例: UIManager.ts
    document.getElementById("btnIfGreen")?.addEventListener("click", () => {
      this.addCommand(CommandType.IF_COLOR, { color: "GREEN" });
    });

    // Go ボタン: コマンドセットしてエンジン開始
    document.getElementById("btnGo")?.addEventListener("click", () => {
      this.engine.setCommands(this.commandList);
      this.engine.start();
    });

    // Reset ボタン
    document.getElementById("btnReset")?.addEventListener("click", () => {
      this.engine.reset();
      // コマンドリストもクリアしておく
      this.commandList = [];
      this.updateCommandQueueView();
      // 再描画
      this.renderAll();
    });

    // スピードスライダー
    const speedSlider = document.getElementById("speedSlider") as HTMLInputElement;
    speedSlider.addEventListener("input", () => {
      const speedValue = parseInt(speedSlider.value, 10); // 1～10
      this.engine.setExecutionSpeed(speedValue);
    });

    // エンジン内でコマンドが進むたびに描画を更新する仕組み:
    // - 最も簡単なのはGameEngineからUI側の更新メソッドを呼ぶ
    //   例: engineにUIManagerを渡し、executeNextCommand()の最後で this.uiManager.renderAll();
    // - ここでは initUI にイベントハンドラを足す例だけ記載

    // 初期のマップ描画
    this.renderAll();
  }

  // コマンド追加
  private addCommand(type: CommandType, args?: any) {
    const cmd: ICommand = { type, args };
    this.commandList.push(cmd);
    this.updateCommandQueueView();
  }

  // コマンドキュー表示
  private updateCommandQueueView() {
    const queueDiv = document.getElementById("commandQueue")!;
    queueDiv.innerHTML = "";
    this.commandList.forEach(cmd => {
      const cmdSpan = document.createElement("span");
      cmdSpan.style.marginRight = "8px";
      cmdSpan.textContent = this.commandLabel(cmd);
      queueDiv.appendChild(cmdSpan);
    });
  }

  private commandLabel(cmd: ICommand): string {
    switch (cmd.type) {
      case CommandType.FORWARD: return "↑";
      case CommandType.TURN_LEFT: return "←";
      case CommandType.TURN_RIGHT: return "→";
      case CommandType.LOOP_START: return "F1(LoopStart)";
      case CommandType.LOOP_END: return "F2(LoopEnd)";
      case CommandType.IF_COLOR: return "IF(color)";
      default: return cmd.type;
    }
  }

  /**
   * マップ＆プレイヤーをまとめて再描画
   */
  public renderAll() {
    this.renderer.drawMap(this.map);
    this.renderer.drawPlayer(this.player);
  }
}
