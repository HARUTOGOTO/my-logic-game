// src/index.ts
import { Player, Direction } from "./game/Player";
import { GameMap } from "./game/Map";
import { GameEngine } from "./game/GameEngine";
import { UIManager } from "./ui/UIManager";
// ▼ ゲームのロジック初期化 ▼
// 例: 6x4マップ
const tileColors = [
    ["BLUE", "BLUE", "BLUE", "BLUE", "BLUE", "BLUE"],
    ["BLUE", "BLUE", "BLUE", "BLUE", "BLUE", "BLUE"],
    ["BLUE", "BLUE", "BLUE", "BLUE", "BLUE", "BLUE"],
    ["BLUE", "BLUE", "BLUE", "BLUE", "BLUE", "BLUE"],
];
const map = new GameMap(6, 4, tileColors);
// アイテム配置
map.addItem(2, 1);
map.addItem(3, 1);
// プレイヤーを中央に配置
const player = new Player(2, 2, Direction.UP);
// GameEngine
const engine = new GameEngine(player, map);
// ▼ UI (レンダリング) ▼
const uiManager = new UIManager(engine, map, player);
// 連携: コマンド実行ごとにUI再描画する例
// GameEngine の executeNextCommand() の最後で呼ぶか、
// ここで engine にコールバックを仕込むなど多様なやり方あり。
// ここではGameEngineにUIManagerを渡しておく例:
engine.onAfterCommand = () => {
    uiManager.renderAll();
};
// DOMロード後にUIの初期化
window.addEventListener("DOMContentLoaded", () => {
    uiManager.initUI();
});
// index.ts
engine.onAfterCommand = () => {
    uiManager.renderAll();
};
// index.ts (追加イメージ)
import { StageSelect } from "./ui/StageSelect";
const stageSelect = new StageSelect("stageSelectContainer");
// 初期起動時にステージ選択UIを表示
window.addEventListener("DOMContentLoaded", () => {
    stageSelect.render((stageDef) => {
        // ここでGameEngineやPlayerを再作成
        const map = stageDef.map;
        const player = new Player(stageDef.playerStartX, stageDef.playerStartY, Direction.UP);
        const engine = new GameEngine(player, map);
        const uiManager = new UIManager(engine, map, player);
        // 連携: エンジンが毎コマンド動くたびにUIを再描画
        engine.onAfterCommand = () => uiManager.renderAll();
        uiManager.initUI();
    });
});
