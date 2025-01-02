// src/ui/StageSelect.ts
import { StageList } from "../game/StageDefinitions";
export class StageSelect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    render(onStageSelected) {
        this.container.innerHTML = ""; // クリア
        StageList.forEach((stageDef) => {
            const btn = document.createElement("button");
            btn.textContent = `Stage ${stageDef.id}`;
            btn.addEventListener("click", () => {
                onStageSelected(stageDef);
            });
            this.container.appendChild(btn);
        });
    }
}
