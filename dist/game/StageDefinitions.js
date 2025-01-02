// src/game/StageDefinitions.ts
import { GameMap } from "./Map";
export function loadStage1() {
    const tileColors = [
        ["BLUE", "BLUE", "BLUE", "BLUE"],
        ["BLUE", "BLUE", "BLUE", "BLUE"],
        ["BLUE", "BLUE", "BLUE", "BLUE"]
    ];
    const map = new GameMap(4, 3, tileColors);
    // アイテムを何個か追加
    map.addItem(1, 1);
    map.addItem(2, 1);
    return {
        id: 1,
        map,
        playerStartX: 0,
        playerStartY: 1
    };
}
export function loadStage2() {
    const tileColors = [
        ["RED", "RED", "GREEN", "BLUE"],
        ["GREEN", "BLUE", "RED", "GREEN"],
        ["BLUE", "GREEN", "BLUE", "RED"],
        ["RED", "RED", "GREEN", "BLUE"]
    ];
    const map = new GameMap(4, 4, tileColors);
    map.addItem(0, 0);
    map.addItem(3, 3);
    return {
        id: 2,
        map,
        playerStartX: 1,
        playerStartY: 1
    };
}
// ステージ一覧
export const StageList = [loadStage1(), loadStage2()];
