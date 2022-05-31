let player_x = 0;
let player_y = 0;
let treasure = false;

window.onload = () => {
    // TODO: テスト用データなのでmap生成機能ができたら削除する
    let map = new Map();
    map.data = Array.from(
        "0000000000"
       +"01111g1110"
       +"0000101110"
       +"0111101110"
       +"0110001110"
       +"01111p1110"
       +"0000000000"
    );

    let statusBox = document.getElementById("statusBox");
    let gameScreen = document.getElementById("gameScreen");
    let messageWindow = document.getElementById("messageWindow");

    // ゲーム開始時のメッセージ
    messageWindow.innerHTML = "The beginning of a new adventure!";

    // TODO: ステータス情報のダミーデータ。実装後削除する
    statusBox.innerHTML = "_1F Lv.1 HP 15/ 15";
    
    // ゲーム開始時の初期表示
    updateGameScreen(map.data)

    /**
     * キー入力のイベントハンドラです。
     * @param {string} キー入力
     */
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
        case 'a':
            if(treasure) {
                // プレイヤーと同じ座標にtreasureがあった場合のイベント
                messageWindow.innerHTML = "You got the treasure!!"
                return;
            }
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            let nextIndex = getNextIndex(map, e.key);
            if(checkInnerMap(map, nextIndex) && checkMovable(map.data[nextIndex])) {
                // 移動可能な場合の処理
                map.data = updateMapData(map, nextIndex);
                updateGameScreen(map.data);
            }
            
            if(treasure) {
                // 足元にお宝がある場合
                messageWindow.innerHTML = "There is something on the road.";
            }
            else {
                messageWindow.innerHTML = "Direction: " + e.key;
            }
        }
    });

    /**
     * 次に進む予定の座標に対応するマップデータのindexを取得します。
     * @param {Map} map マップオブジェクト
     * @param {string} direction 次に進む方向
     * @returns {number} 次に進む予定の座標に対応するマップデータのindex
     */
    function getNextIndex(map, direction) {
        return map.getIndex(player_x, player_y) + map.getMoveIndex(direction);
    }

    /**
     * 移動先がマップの領域内にあるかチェックします。
     * @param {Map} map マップ
     * @param {Number} nextIndex 
     * @returns {boolean} 領域内/外
     */
    function checkInnerMap(map, nextIndex) { 
        if(!(0 <= nextIndex && nextIndex < map.max_height * map.max_width)) {
            return false;
        }

        return true;
    }

    /**
     * 移動可能かをチェックします。
     * @param {char} mapchip マップチップ
     * @returns {boolean} 移動可否
     */
    function checkMovable(mapchip) {
        if(mapchip == '1' || mapchip == 'g') {
            return true;
        }

        return false;
    }

    /**
     * 第2引数で与えたindexに移動する時にマップ情報を更新し、更新後のマップデータを返します。
     * @param {Map} map 
     * @param {Number} nextIndex 
     * @returns {Array<char>} 更新後のマップデータ
     */
    function updateMapData(map, nextIndex) {
        let tmpNextMapchip = map.data[nextIndex];
        map.data[nextIndex] = 'p';

        if(treasure) {
            // 足元にお宝がある場合、更新後のマップにお宝を戻す
            map.data[map.getIndex(player_x, player_y)] = 'g';
            treasure = false;
        }
        else {
            map.data[map.getIndex(player_x, player_y)] = '1';
        }

        if(tmpNextMapchip == 'g') {
            treasure = true;
        }
        
        return map.data;
    }

    /**
     * 画面表示を更新します。
     * @param {string} displayMapData 
     */
    function updateGameScreen(displayMapData) {
        gameScreen.innerHTML = getDisplayData(displayMapData);
    }

    /**
     * マップデータを画面表示用のデータに変換します。
     * @param {Array<char>} mapData マップデータ
     * @returns {string} 画面表示用のデータ
     */
    function getDisplayData(mapData) {
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
                    player_x = i % 10;
                    player_y = Math.floor(i / 10);
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
