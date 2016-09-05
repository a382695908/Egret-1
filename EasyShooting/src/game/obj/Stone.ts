/**
 *
 * 石头
 *
 */
class Stone extends Unit {
    public constructor() {
        super();
        this._className = "Item";
    }

    /** 子弹信息 */
    protected _data: ItemData;
    /** 状态: 1: 正常 2:飞向英雄 */
    private _state: number;
    /** 目标 */
    private _target: Hero;

    /** 图片 */
    private _img: egret.Bitmap;
    /** 拖尾效果 */
    private _tail: Tail;

    /**
     * 初始化
     */
    public init(id: number) {
        this._side = Side.Middle;
        this._data = GameDataManager.GetItemData(id);
        this.width = this.w;
        this.height = this.h;
        this.setImg(this._data.img);
    }

    /**
	 * 设置图片
	 */
    private setImg(img: string) {
        if (this._img == null) {
            this._img = new egret.Bitmap;
            this.addChild(this._img);
        }
        this._img.texture = RES.getRes(img);
    }

    /**
     * 更新
     */
    public update(t: number) {
        super.update(t);
        if (this._state == 2) {
            this.drawTrail(0xffffff);
        }
    }

    /**
     * 移除
     */
    public remove() {

    }

    /**
     * 被获得
     */
    public getBy(hero: Hero){
        if(this._state == 2){
            return ;
        }else{
            this._state = 2;
            this._target = hero;
        }
    }

    /**
     * 绘制拖尾
     */
    private drawTrail(color: number) {
        if (this._tail == null) {
            this._tail = ObjectPool.pop("Tail");
            this._tail.init(Math.sqrt(this.height) * 3.5, color);
            this.parent.addChild(this._tail);
            this.parent.setChildIndex(this._tail, this.parent.getChildIndex(this) - 1);
        }
        this._tail.addPoint(this.x, this.y);
    }

    /**
     * 清除拖尾
     */
    private clearTail() {
        this._tail.clear();
        this._tail = null;
    }

    /**
     * 摧毁
     */
    public destory() {
        super.destory();
        if (this._tail != null) {
            this.clearTail();
        }
    }

    /**
     * 速度
     */
    public get speed(): number {
        return this._data.speed;
    }

    /**
     * 宽
     */
    public get w(): number {
        return 60;
    }

    /**
     * 高
     */
    public get h(): number {
        return 60;
    }

    /**
     * 质量
     */
    public get mass(): number {
        return 1;
    }
}