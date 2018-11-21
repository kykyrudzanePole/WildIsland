var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var tmxTiledMap = new cc.TMXTiledMap("res/test.tmx");
        cc.log(tmxTiledMap.getMapSize());
        cc.log(tmxTiledMap.allLayers());
        tmxTiledMap.setPosition(500, 500);

        this.addChild(tmxTiledMap);
        cc.log(tmxTiledMap);
        cc.log(tmxTiledMap.getTileSize());
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});