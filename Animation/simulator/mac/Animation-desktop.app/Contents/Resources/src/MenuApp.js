var size = cc.winSize;


var MenuLayer = cc.Layer.extend({
   
    ctor: function () {
        
        this._super();
        
        var backgrounSprite = new cc.Sprite("res/MenuBackground.jpg");
        backgrounSprite.setPosition(size.width / 2, size.height / 2);
        backgrounSprite.setScale(0.43);
        this.addChild(backgrounSprite);
        
        var logoImage = new cc.MenuItemImage("res/MenuLogo.png", "res/MenuLogo.png", null, this);
        logoImage.setScale(0.4);
        logoImage.setAnchorPoint(0.5, 0.5);
        logoImage.setPosition(10, 55);
        
        var playImage = new cc.MenuItemImage("res/playImage.png", "res/selectPlayImage.png", play, this);
        playImage.setScale(0.4);
        playImage.setPosition(0, 0);
        
        var menu = new cc.Menu(logoImage, playImage);
        menu.setPosition(size.width / 2, size.height / 2);
        
        this.addChild(menu);
        
    }
});

var play = function () {
    cc.director.pushScene(new GameScene());
}


var MenuScene = cc.Scene.extend({

    onEnter: function () {
       
        this._super();
        
        var layer = new MenuLayer();
        this.addChild(layer);
       
   } 
});
