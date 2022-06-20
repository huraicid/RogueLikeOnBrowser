class Player {
    /**
     * プレーヤーのx座標
     * @type {Number}
     */
    x = 0;

    /**
     * プレーヤーのy座標
     * @type {Number}
     */
    y = 0;

    /**
     * 足元にアイテムがあるかどうかのフラグ
     */
    isTreasureOntheRoad = false;

    /**
     * コンストラクタ
     * @param {Object} プレイヤー情報
     */
    constructor(params) {
        this.x = params.player_x;
        this.y = params.player_y;
        this.isTreasureOntheRoad = params.player_isTreasureOntheRoad;
    }

}