export class UIManager {
    constructor(engine) {
        this.commandList = [];
        this.engine = engine;
    }
    addCommand(cmdType, args) {
        this.commandList.push({ type: cmdType, args });
    }
    removeCommand(index) {
        this.commandList.splice(index, 1);
    }
    startGame() {
        this.engine.setCommands(this.commandList);
        this.engine.start();
    }
    stopGame() {
        this.engine.stop();
    }
    resetGame() {
        this.engine.reset();
    }
    /**
     * スライダー等のUI要素を初期化するメソッド
     */
    initUI() {
        // speedSliderを取得し、変更イベントを監視
        const speedSlider = document.getElementById("speedSlider");
        speedSlider.addEventListener("input", () => {
            const speed = parseInt(speedSlider.value, 10); // 1～10
            // ↓ this.engine ならクラス内プロパティにアクセスできる
            this.engine.setExecutionSpeed(speed);
        });
    }
}
