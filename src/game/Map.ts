// src/game/Map.ts

export class GameMap {
  public width: number;
  public height: number;
  public tiles: string[][]; // タイルの色やタイプを文字列で管理
  
  public items: { x: number, y: number, collected: boolean }[] = [];

  constructor(width: number, height: number, tileColors: string[][]) {
    this.width = width;
    this.height = height;
    this.tiles = tileColors;
  }

  public addItem(x: number, y: number) {
    this.items.push({ x, y, collected: false });
  }

  public getTileColor(x: number, y: number): string {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return "OUT_OF_BOUNDS";
    }
    return this.tiles[y][x]; // y行 x列 という想定
  }

  public checkAndCollectItem(x: number, y: number) {
    this.items.forEach((item) => {
      if (item.x === x && item.y === y && !item.collected) {
        item.collected = true;
        // サウンド効果やアニメなどの演出もここで
        console.log("42アイテムを取得しました！");
      }
    });
  }

  public allItemsCollected(): boolean {
    return this.items.every(item => item.collected);
  }
}
