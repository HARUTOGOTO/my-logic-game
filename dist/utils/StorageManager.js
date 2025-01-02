// src/utils/StorageManager.ts
export class StorageManager {
    static getClearedStages() {
        const dataStr = localStorage.getItem("clearedStages");
        if (dataStr) {
            return JSON.parse(dataStr);
        }
        return [];
    }
    static addClearedStage(stageId) {
        const cleared = this.getClearedStages();
        if (!cleared.includes(stageId)) {
            cleared.push(stageId);
            localStorage.setItem("clearedStages", JSON.stringify(cleared));
        }
    }
}
