// src/ui/StageSelect.ts
import { StageList } from "../game/StageDefinitions";
import { StorageManager } from "../utils/StorageManager";
export class StageSelect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    render() {
        this.container.innerHTML = "";
        StageList.forEach((stageDef) => {
            const stageButton = document.createElement("button");
            stageButton.textContent = `Stage ${stageDef.id}`;
            // ユーザーがすでにクリアしているか判定
            const clearedStages = StorageManager.getClearedStages();
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
