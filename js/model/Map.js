class Map {
    /**
     * マップデータ
     * @type {Array<char>} 
     */
    data = null;
    
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
     * 引数で与えた座標に対応するマップデータのindexを返します。
     * @param {number} x x座標（整数値）
     * @param {number} y y座標（整数値）
     * @returns その座標に対応するマップデータのindex
     */
    getIndex(x, y) {
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
}