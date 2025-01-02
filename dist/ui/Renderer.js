// src/ui/Renderer.ts
export class Renderer {
    constructor(canvasId, map) {
        this.tileSize = 40; // タイル1マスのピクセルサイズ（任意）
        this.rows = 0;
        this.cols = 0;
        this.itemImg = new Image(); // アイテム用画像＿自分で入れてみた
        const canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext("2d");
        this.rows = map.height;
        this.cols = map.width;
        this.itemImg.src = "assets/item42.png"; // アイテム用画像＿自分で入れてみた
    }
    /**
     * マップ全体を描画
     */
    drawMap(map) {
        // キャンバスを一旦クリア
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const color = map.getTileColor(x, y);
                // 色に応じて塗りつぶす (例: RED, GREEN, BLUEなど)
                this.ctx.fillStyle = this.convertColor(color);
                this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
        // アイテム (42) を描画
        map.items.forEach(item => {
            if (!item.collected) {
                this.drawItem(item.x, item.y);
            }
        });
    }
    /**
     * プレイヤーを描画
     */
    drawPlayer(player) {
        const px = player.x * this.tileSize;
        const py = player.y * this.tileSize;
        // 三角形でプレイヤーを表現する例
        this.ctx.fillStyle = "gray";
        this.ctx.beginPath();
        switch (player.direction) {
            case 0: // UP
                this.ctx.moveTo(px + this.tileSize / 2, py + 5);
                this.ctx.lineTo(px + 5, py + this.tileSize - 5);
                this.ctx.lineTo(px + this.tileSize - 5, py + this.tileSize - 5);
                break;
            case 1: // RIGHT
                this.ctx.moveTo(px + 5, py + 5);
                this.ctx.lineTo(px + this.tileSize - 5, py + this.tileSize / 2);
                this.ctx.lineTo(px + 5, py + this.tileSize - 5);
                break;
            case 2: // DOWN
                this.ctx.moveTo(px + 5, py + 5);
                this.ctx.lineTo(px + this.tileSize - 5, py + 5);
                this.ctx.lineTo(px + this.tileSize / 2, py + this.tileSize - 5);
                break;
            case 3: // LEFT
                this.ctx.moveTo(px + this.tileSize - 5, py + 5);
                this.ctx.lineTo(px + 5, py + this.tileSize / 2);
                this.ctx.lineTo(px + this.tileSize - 5, py + this.tileSize - 5);
                break;
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    /**
     * タイル色をCanvas用の色コードに変換
     */
    convertColor(tileColor) {
        switch (tileColor) {
            case "RED": return "red";
            case "GREEN": return "green";
            case "BLUE": return "blue";
            default: return "#ccc"; // デフォルトグレー
        }
    }
    /**
     * アイテム(42)を描画する例
     */
    drawItem(x, y) {
        // 画像が読み込まれていれば描画
        if (this.itemImg.complete) {
            this.ctx.drawImage(this.itemImg, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
        else {
            // 読み込まれてないならテキストや別の描画でもOK
            this.ctx.fillStyle = "black";
            this.ctx.fillText("42", x * this.tileSize + 10, y * this.tileSize + 25);
        }
    }
}
