"use strict";
// src/game/StageDefinitions.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageList = void 0;
exports.loadStage1 = loadStage1;
const Map_1 = require("./Map");
exports.StageList = [];
function loadStage1() {
    // 例: 5x5のマップに色をつける
    const tileColors = [
        ["RED", "RED", "GREEN", "GREEN", "BLUE"],
        ["RED", "GREEN", "GREEN", "BLUE", "BLUE"],
        ["GREEN", "GREEN", "BLUE", "BLUE", "BLUE"],
        ["GREEN", "BLUE", "BLUE", "BLUE", "GREEN"],
        ["BLUE", "BLUE", "BLUE", "GREEN", "GREEN"],
    ];
    const map = new Map_1.GameMap(5, 5, tileColors);
    // アイテム配置
    map.addItem(2, 2);
    map.addItem(4, 4);
    return {
        id: 1,
        map,
        playerStartX: 0,
        playerStartY: 0
    };
}
exports.StageList.push(loadStage1());
// 複数ステージがあれば後ろに push
