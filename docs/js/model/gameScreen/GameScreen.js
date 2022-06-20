class GameScreen {
    /**
     * ステータスボックス表示領域
     */
    statusBox;

    /**
     * ゲーム画面表示領域
     */
    gameScreen;

    /**
     * メッセージボックス表示領域
     */
    messageWindow;

    /**
     * コンストラクタ
     * @param {*} statusBox
     * @param {*} gameScreen 
     * @param {*} messageWindow 
     */
    constructor(statusBox, gameScreen, messageWindow) {
        this.statusBox = statusBox;
        this.gameScreen = gameScreen;
        this.messageWindow = messageWindow;

        // ゲーム開始時のメッセージ
        this.messageWindow.innerHTML = "The beginning of a new adventure!";
    }

    /**
     * 画面表示を更新します。
     * @param {string} displayMapData 
     */
    updateGameScreen(displayMapData) {
        gameScreen.innerHTML = this.getDisplayData(displayMapData);
    }

    /**
     * マップデータを画面表示用のデータに変換します。
     * @param {Array<char>} mapData マップデータ
     * @returns {string} 画面表示用のデータ
     */
    getDisplayData(mapData) {
        let rtn = "";
        for(let i = 0; i < mapData.length; i++) {
            if(i != 0 && i % 10 == 0) {
                rtn += "\n";
            }

            switch(mapData[i]) {
                case '0':
                    rtn += "■";
                    break;
                case '1':
                    rtn += "．";
                    break;
                case 'p':
                    rtn += "＠";
                    break;
                case 'g':
                    rtn += "￥";
                    break;
                default:
                    rtn += mapData[i];
            }
        }

        return rtn;
    }

}