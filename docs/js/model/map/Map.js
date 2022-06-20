class Map {
    /**
     * マップデータ
     * @type {Array<char>} 
     */
    data;
    
    /**
     * マップの縦の長さ
     * @type {number}
     */
    max_height = 7;

    /**
     * マップの横の長さ
     * @type {number}
     */
    max_width = 10;

    /**
     * コンストラクタ
     * @param {Array<Char>} mapData 
     */
    constructor(mapData) {
        this.data = mapData;
    }

    /**
     * マップデータを解析して、各種パラメータを取得する
     * @param {Attay<Char>} mapData 
     * @returns {Object} 各種パラメータ
     */
    getMapAnalyzedParameter(mapData) {
        let rtn = new Object();
        rtn.player_isTreasureOntheRoad = true;

        for(let i = 0; i < mapData.length; i++) {
            switch(mapData[i]) {
            case 'p':
                rtn.player_x = i % 10;
                rtn.player_y = Math.floor(i / 10);
                break;
            case 'g':
                rtn.player_isTreasureOntheRoad = false;
                break;
            }
        }

        return rtn;
    }

    /**
     * 引数で与えた座標に対応するマップデータのindexを返します。
     * @param {number} x x座標（整数値）
     * @param {number} y y座標（整数値）
     * @returns その座標に対応するマップデータのindex
     */
    getMapIndex(x, y) {
        return this.max_width * y + x;
    }

    /**
     * 移動元から移動先までのindexの差分をキー入力から返します。
     * @param {string} direction 方向（上下左右）
     * @returns {number} 移動元から移動先までのindexの差分
     */
    getMoveIndex(direction) {
        switch(direction) {
        case 'ArrowUp':
            return -this.max_width;
        case 'ArrowDown':
            return this.max_width;
        case 'ArrowLeft':
            return -1;
        case 'ArrowRight':
            return 1;
        default:
            console.log("something is wrong. The key is " + direction + ".");
            return 0;
        }
    }

    /**
     * 次に進む予定の座標に対応するマップデータのindexを取得します。
     * @param {number} playerX 現在のプレーヤーのx座標
     * @param {number} playerY 現在のプレーヤーのy座標
     * @param {string} direction 次に進む方向
     * @returns {number} 次に進む予定の座標に対応するマップデータのindex
     */
    getNextIndex(playerX, playerY, direction) {
        return this.getMapIndex(playerX, playerY) + this.getMoveIndex(direction);
    }

    /**
     * 指定したindexのチップが移動可能かをチェックします。
     * @param {number} index マップのindex
     * @returns {boolean} 移動可否
     */
    checkMovable(index) {
        let mapchip = this.data[index];
        if(mapchip == '1' || mapchip == 'g') {
            return true;
        }
    
        return false;
    }

    /**
     * 移動先がマップの領域内にあるかチェックします。
     * @param {Number} nextIndex 
     * @returns {boolean} 領域内/外
     */
    checkInnerMap(nextIndex) { 
        if(!(0 <= nextIndex && nextIndex < this.max_height * this.max_width)) {
            return false;
        }
    
        return true;
    }

    /**
     * 第3引数で与えたindexに移動する時にマップ情報を更新し、更新後のマップデータを返します。
     * @param {Number} player プレーヤーインスタンス
     * @param {Number} nextIndex 
     * @returns {Array<char>} 更新後のマップデータ
     */
    updateMapData(player, nextIndex) {
        let rtnMapData = this.data;
        rtnMapData[nextIndex] = 'p';

        let tmpNextMapchip = rtnMapData[nextIndex];

        if(player.isTreasureOntheRoad) {
            // 移動前の時点で足元にお宝がある場合、更新後のマップにお宝を戻す
            rtnMapData[this.getMapIndex(player.x, player.y)] = 'g';
        }
        else {
            rtnMapData[this.getMapIndex(player.x, player.y)] = '1';
        }

        
        return rtnMapData;
    }
}