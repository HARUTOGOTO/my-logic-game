"use strict";
// src/game/Map.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
class GameMap {
    constructor(width, height, tileColors) {
        this.items = [];
        this.width = width;
        this.height = height;
        this.tiles = tileColors;
    }
    addItem(x, y) {
        this.items.push({ x, y, collected: false });
    }
    getTileColor(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return "OUT_OF_BOUNDS";
        }
        return this.tiles[y][x]; // y行 x列 という想定
    }
    checkAndCollectItem(x, y) {
        this.items.forEach((item) => {
            if (item.x === x && item.y === y && !item.collected) {
                item.collected = true;
                // サウンド効果やアニメなどの演出もここで
                console.log("42アイテムを取得しました！");
            }
        });
    }
    allItemsCollected() {
        return this.items.every(item => item.collected);
    }
}
exports.GameMap = GameMap;
