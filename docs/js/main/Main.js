let keyInsertable = true;

window.onload = () => {
    // ゲーム画面を司るオブジェクト
    let gameScreen = new GameScreen(
            document.getElementById("statusBox"), 
            document.getElementById("gameScreen"), 
            document.getElementById("messageWindow")
        );

    // マップ情報を司るオブジェクト
    let map = new Map(Array.from(
        "0000000000"
       +"01111g1110"
       +"0000101110"
       +"0111101110"
       +"0110001110"
       +"01111p1110"
       +"0000000000"));

    // プレーヤーオブジェクト
    let player = new Player(map.getMapAnalyzedParameter(map.data));

    // TODO: ステータス情報のダミーデータ。実装後削除する
    gameScreen.statusBox.innerHTML = "_1F Lv.1 HP 15/ 15";
    
    // ゲーム開始時の初期表示
    gameScreen.updateGameScreen(map.data)

    /**
     * キー入力のイベントハンドラです。
     * @param {string} キー入力
     */
    document.addEventListener('keydown', (e) => {
        if(keyInsertable) {
            switch(e.key) {
            case 'a':
                if(player.isTreasureOntheRoad) {
                    // プレイヤーと同じ座標にtreasureがあった場合のイベント
                    messageWindow.innerHTML = "You got the treasure!!";
                    keyInsertable = false;
                    return;
                }
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                let nextIndex = map.getNextIndex(player.x, player.y, e.key);
                if(map.checkInnerMap(nextIndex) && map.checkMovable(nextIndex)) {
                    // 移動可能な場合の処理
                    // マップデータを更新する
                    map.data = map.updateMapData(player, nextIndex);

                    // プレーヤーの座標を更新する
                    player = new Player(map.getMapAnalyzedParameter(map.data));

                    // ゲーム画面を更新する
                    gameScreen.updateGameScreen(map.data);
                }
                
                if(player.isTreasureOntheRoad) {
                    // 足元にお宝がある場合
                    gameScreen.messageWindow.innerHTML = "There is something on the road.";
                }
                else {
                    gameScreen.messageWindow.innerHTML = "Direction: " + e.key;
                }
            }
        }       
    });


    
}
