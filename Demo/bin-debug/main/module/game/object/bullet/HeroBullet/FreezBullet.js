/**
 *
 * 冰冻弹
 *
 */
var FreezBullet = (function (_super) {
    __extends(FreezBullet, _super);
    function FreezBullet() {
        _super.apply(this, arguments);
    }
    var d = __define,c=FreezBullet,p=c.prototype;
    p.doEffect = function (unit) {
        unit.Freez(0.5);
    };
    return FreezBullet;
}(NormalBullet));
egret.registerClass(FreezBullet,'FreezBullet');
//# sourceMappingURL=FreezBullet.js.map