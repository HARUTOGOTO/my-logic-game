// src/ui/StageSelect.ts
import { StageList, StageDefinition } from "../game/StageDefinitions";

export class StageSelect {
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
  }

  public render(onStageSelected: (stageDef: StageDefinition) => void) {
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
