/**
 *
 * @author 
 *
 */
class GameController extends BaseController {

    private gameView: GameView;
    private gameUIView: GameUIView;
    
    public constructor() {
        super();

        //初始化数据
        GameManager.Init();
        
        //初始化UI
        this.gameView = new GameView(this, LayerManager.Game_Main);
        App.ViewManager.register(ViewConst.Game, this.gameView);
        this.gameUIView = new GameUIView(this, LayerManager.Game_UI);
        App.ViewManager.register(ViewConst.GameUI, this.gameUIView);
        
        this.registerFunc(GameConst.Jump, this.gameView.Jump, this.gameView);
        this.registerFunc(GameConst.Shoot, this.gameView.Shoot, this.gameView);
        this.registerFunc(GameConst.CeateBullet, this.gameView.CreateBullet, this.gameView);
        this.registerFunc(GameConst.RemoveBullet, this.gameView.RemoveBullet, this.gameView);
        this.registerFunc(GameConst.RemoveItem,this.gameView.RemoveItem,this.gameView);
        this.registerFunc(GameConst.HeroDie,this.gameView.SetHeroDie,this.gameView);
        this.registerFunc(GameConst.AddScore,this.gameUIView.AddScore,this.gameUIView);
    }
    
    /**
     * 检查敌人相对英雄位置
     * 1: 英雄在上方 0: 持平 -1: 英雄在下方
     */ 
    public CheckEnemyPosByHero(enemy: Hero): number{
        var hero = this.gameView.GetHero();
        if(hero.y - enemy.y < -10){
            return 1;
        }else if(hero.y - enemy.y > 10){
            return -1;
        }
        return 0;
    }
    
    /**
     * 检测是否击中子弹
     */ 
    public CheckHitBullet(bullet: Bullet): Array<Bullet>{
        var bullets = [];
        var arr: Array<Bullet> = [];
        if(bullet.side == Side.Own) {
            arr = this.gameView.GetEnemyBullets();
        } else {
            arr = this.gameView.GetOwnBullets();
        }

        for(let i = 0;i < arr.length;i++) {
            let b: Bullet = arr[i];
            if(this.hitTest(bullet.rect,b.rect)) {
                bullets.push(b);
            }
        }     
        return bullets;
    }
    
    /**
     * 检测子弹是否击中英雄
     */ 
    public CheckHitHero(bullet: Bullet): Array<Hero>{
        var hitHeroes = [];
        var arr: Array<Hero> = [];
        if(bullet.side == Side.Own){
            arr = this.gameView.GetEnemies();
        }else{
            arr = [this.gameView.GetHero()];
        }
        for(let i = 0;i < arr.length;i++) {
            let hero: Hero = arr[i];
            if(this.hitTest(bullet.rect, hero.rect)) {
                hitHeroes.push(hero);
            }
        }        
        return hitHeroes;
    }
    
    /**
     * 检查是否击中道具
     */ 
    public CheckHitItem(bullet: Bullet): Array<Item> {
        var hitItems = [];
        var items = this.gameView.GetItems();
        for(let i = 0;i < items.length;i++) {
            let item: Item = items[i];
            if(this.hitTest(bullet.rect,item.rect)) {
                hitItems.push(item);
            }
        }
        return hitItems;
    }
    
    /**
     * 检测英雄是否超出范围(Y轴)
     */ 
    public CheckHeroOut(hero: Hero): Boolean{
        if(hero.y - hero.anchorOffsetY < this.gameView.min_y){
            hero.y = this.gameView.min_y + hero.anchorOffsetY;
            return true;
        }else if(hero.y - hero.anchorOffsetY + hero.height > this.gameView.max_y){
            hero.y = this.gameView.max_y + hero.anchorOffsetY - hero.height;
            return true;
        }
        return false;
    }
    
    /**
     * 检测是否超出屏幕
     */
    public CheckOutScreen(object: BaseGameObject): Boolean {
        return !this.hitTest(new egret.Rectangle(object.x, object.y, object.width, object.height), 
                            new egret.Rectangle(0, 0, App.StageUtils.getWidth(), App.StageUtils.getHeight()));
    }
    
    /**
     * 碰撞检测
     */ 
    private hitTest(rect1: egret.Rectangle,rect2: egret.Rectangle): boolean {
        return rect1.intersects(rect2);
    }
    
    /**
     * 获取游戏横向百分比
     */ 
    public GetPerX(per: number){
        return (this.gameView.max_x - this.gameView.min_x) * per + this.gameView.min_x;
    }
}