// src/ui/UIManager.ts
import { CommandType } from "../game/Command";
import { Renderer } from "./Renderer";
export class UIManager {
    constructor(engine, map, player) {
        this.commandList = [];
        this.engine = engine;
        this.map = map;
        this.player = player;
        // Renderer の初期化(このMapのサイズに合わせる)
        this.renderer = new Renderer("gameCanvas", map);
    }
    initUI() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // コマンド追加ボタン
        (_a = document.getElementById("btnForward")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.addCommand(CommandType.FORWARD);
        });
        (_b = document.getElementById("btnLeft")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.addCommand(CommandType.TURN_LEFT);
        });
        (_c = document.getElementById("btnRight")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.addCommand(CommandType.TURN_RIGHT);
        });
        (_d = document.getElementById("btnF1")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            // 例: ループ開始/終了をセットするなど、お好みで
            // あるいはF1用の特別コマンドを作る
            this.addCommand(CommandType.LOOP_START, { count: 2 }); // サンプル
        });
        (_e = document.getElementById("btnF2")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.addCommand(CommandType.LOOP_END);
        });
        // 例: UIManager.ts
        (_f = document.getElementById("btnIfGreen")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
            this.addCommand(CommandType.IF_COLOR, { color: "GREEN" });
        });
        // Go ボタン: コマンドセットしてエンジン開始
        (_g = document.getElementById("btnGo")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
            this.engine.setCommands(this.commandList);
            this.engine.start();
        });
        // Reset ボタン
        (_h = document.getElementById("btnReset")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
            this.engine.reset();
            // コマンドリストもクリアしておく
            this.commandList = [];
            this.updateCommandQueueView();
            // 再描画
            this.renderAll();
        });
        // スピードスライダー
        const speedSlider = document.getElementById("speedSlider");
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
    addCommand(type, args) {
        const cmd = { type, args };
        this.commandList.push(cmd);
        this.updateCommandQueueView();
    }
    // コマンドキュー表示
    updateCommandQueueView() {
        const queueDiv = document.getElementById("commandQueue");
        queueDiv.innerHTML = "";
        this.commandList.forEach(cmd => {
            const cmdSpan = document.createElement("span");
            cmdSpan.style.marginRight = "8px";
            cmdSpan.textContent = this.commandLabel(cmd);
            queueDiv.appendChild(cmdSpan);
        });
    }
    commandLabel(cmd) {
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
    renderAll() {
        this.renderer.drawMap(this.map);
        this.renderer.drawPlayer(this.player);
    }
}
