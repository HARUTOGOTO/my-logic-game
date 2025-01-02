"use strict";
// src/ui/StageSelect.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageSelect = void 0;
const StageDefinitions_1 = require("../game/StageDefinitions");
const StorageManager_1 = require("../utils/StorageManager");
class StageSelect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    render() {
        this.container.innerHTML = "";
        StageDefinitions_1.StageList.forEach((stageDef) => {
            const stageButton = document.createElement("button");
            stageButton.textContent = `Stage ${stageDef.id}`;
            // ユーザーがすでにクリアしているか判定
            const clearedStages = StorageManager_1.StorageManager.getClearedStages();
            if (clearedStages.includes(stageDef.id)) {
                stageButton.disabled = false;
            }
            else {
                // まだクリアしていない場合
                // 直前のステージがクリアされていなければロックするなど
                // ここでは簡単に disabled を付ける
                stageButton.disabled = true;
            }
            stageButton.addEventListener("click", () => {
                // ゲーム画面に切り替える処理
                console.log(`Stage ${stageDef.id} を選択`);
                // 実際にはRouterや状態管理で画面を切り替える
            });
            this.container.appendChild(stageButton);
        });
    }
}
exports.StageSelect = StageSelect;
