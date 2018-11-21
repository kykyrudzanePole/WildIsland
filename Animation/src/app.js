var size = cc.winSize;

var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {

        this._super();
        var tmxTiledMap = new cc.TMXTiledMap("res/MainMap.tmx");
        this.addChild(tmxTiledMap);
        
        var sprite = new cc.Sprite("res/nakedMan1");
        sprite.setAnchorPoint(0.5, 0.5);
        sptrite.setPosition(size.height / 2, size.width / 2);

        cc.SpriteFrameCatch.addSpriteFrames("res/WildIslandSpriteFrame.plist");
        var animFrame = [];
        var str = "";
        for (var i = 2; i < 4; i++) {
            str = "nakedMan" + i + ".png";
            var frame = cc.spriteFrameCatch(str);
            animFrame.push(frame);
        }
        var animation = new cc.Animation(animFrame, 0.5);
        var animate = new cc.Animate(animation);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});