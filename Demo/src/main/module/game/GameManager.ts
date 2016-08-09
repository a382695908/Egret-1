/**
 *
 * @author 
 *
 */
class GameManager {
    private static ui_h: number;
    private static heroDic: { [id: number]: HeroData } = {};
    private static gunDic: { [id: number]: GunData } = {};
    private static bulletDic: { [id: number]: BulletData } = {};
    private static itemDic: { [id: number]: ItemData } = {};

    /**
     * 初始化游戏数据
     */
    public static Init() {
        var data = RES.getRes("game_json");
        this.ui_h = data["ui_h"];
        var heroes: Array<HeroData> = data["heroes"];
        var guns: Array<GunData> = data["guns"];
        var bullets: Array<BulletData> = data["bullets"];
        var items: Array<ItemData> = data["items"];
        
        for(let i = 0;i < heroes.length;i++) {
            let h = heroes[i];
            this.heroDic[h.id] = h;
        }

        for(let i = 0;i < guns.length;i++) {
            let g = guns[i];
            this.gunDic[g.id] = g;
        }

        for(let i = 0;i < bullets.length;i++) {
            let b = bullets[i];
            this.bulletDic[b.id] = b;
        }
        
        for(let i = 0;i < items.length;i++) {
            let item = items[i];
            this.itemDic[item.id] = item;
        }
    }

    /**
     * 获取英雄数据
     */
    public static GetHeroData(id: number) {
        return this.heroDic[id];
    }

    /**
     * 获取枪数据
     */
    public static GetGunData(id: number) {
        return this.gunDic[id];
    }

    /**
     * 获取子弹数据
     */
    public static GetBulletData(id: number) {
        return this.bulletDic[id];
    }
    
    /**
     * 获取道具数据
     */
    public static GetItemData(id: number) {
        return this.itemDic[id];
    }

    /**
     * 底部UI高度
     */
    public static get UI_H(): number {
        return this.ui_h;
    }
}