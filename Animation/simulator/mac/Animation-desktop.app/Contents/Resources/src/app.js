var size = cc.winSize;
var mainHeroSpriteArray = [];
var ButtonDown;
var ButtonUp;
var ButtonLeft;
var ButtonRight;
var mainSprite;

var boolLeftAnimate;
var leftAnimateArray1 = [];
var leftAnimateArray2 = [];

var boolRightAnimate;               
var rightAnimateArray1 = [];
var rightAnimateArray2 = [];

var boolUpAnimate;               
var upAnimateArray1 = [];
var upAnimateArray2 = [];

var boolDownAnimate;               
var downAnimateArray1 = [];
var downAnimateArray2 = [];


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    ctor:function () {

        this._super();
        
        //      create tile map //
        var tmxTiledMap = new cc.TMXTiledMap("res/MainMap.tmx");
        tmxTiledMap.setScale(0.8);
        this.addChild(tmxTiledMap);
        
        //      create hero sprite //
        mainSprite = new cc.Sprite("res/nakedMan1.png");
        mainSprite.setPosition(800, 300);
        mainSprite.setScale(2);
        
        this.addChild(mainSprite);
        
        //      create four buttons for manage      //
        
    {
        ButtonDown = new cc.Sprite("res/ButtonDown.png");
        ButtonDown.setPosition(size.width/1.2,size.height/7.8);
        ButtonDown.setScale(0.5);
        ButtonDown.setOpacity(150);
        
        this.addChild(ButtonDown,2);

        ButtonLeft = new cc.Sprite("res/ButtonLeft.png");
        ButtonLeft.setPosition(size.width/1.3,size.height/4.5);
        ButtonLeft.setScale(0.5);
        ButtonLeft.setOpacity(150);
        
        this.addChild(ButtonLeft,2);

        ButtonRight = new cc.Sprite("res/ButtonRight.png");
        ButtonRight.setPosition(size.width/1.114,size.height/4.5);
        ButtonRight.setScale(0.5);
        ButtonRight.setOpacity(150);
        
        this.addChild(ButtonRight,2);

        ButtonUp = new cc.Sprite("res/ButtonUp.png");
        ButtonUp.setPosition(size.width/1.2,size.height/3.2);
        ButtonUp.setScale(0.5);
        ButtonUp.setOpacity(150);
        
        this.addChild(ButtonUp,2);
        
    }
        
        /////       downlod sprites to the spriteFrameCache, create textureCache and animationFrame   /////
        
        cc.spriteFrameCache.addSpriteFrames("res/WildIslandSpriteFrame.plist");
        var spriteTexture = cc.textureCache.addImage("#res/WildIslandSpriteFrame.png");        
        var spriteImages = new cc.SpriteBatchNode(spriteTexture);
        
        this.addChild(spriteImages);
        
        var spriteName = "";
        
        for (var i = 1; i <= 12; i++) {
            
            spriteName = "nakedMan" + i + ".png";
            
            var frameSprite = cc.spriteFrameCache.getSpriteFrame(spriteName);
            var animationFrame = new cc.AnimationFrame();
            animationFrame.initWithSpriteFrame(frameSprite, 1, null);
            mainHeroSpriteArray.push(animationFrame);
            
        }
        
        ////        create arrays of action for sprites move        ////
    {
        leftAnimateArray1 = [
            
            mainHeroSpriteArray[4],
            mainHeroSpriteArray[3]
        
        ];
        
        leftAnimateArray2 = [
            
            mainHeroSpriteArray[5],
            mainHeroSpriteArray[3],
        
        ];
        
        rightAnimateArray1 = [
            
            mainHeroSpriteArray[7],
            mainHeroSpriteArray[6],
            
        ];
        
        rightAnimateArray2 = [
            
            mainHeroSpriteArray[8],
            mainHeroSpriteArray[6],
            
        ];
        
        upAnimateArray1 = [
            
            mainHeroSpriteArray[11],
            mainHeroSpriteArray[9],
            
        ];
        
        upAnimateArray2 = [
            
            mainHeroSpriteArray[10],
            mainHeroSpriteArray[9],
            
        ];
        
        downAnimateArray1 = [
            
            mainHeroSpriteArray[1],
            mainHeroSpriteArray[0],
            
        ];
        
        downAnimateArray2 = [
            
            mainHeroSpriteArray[2],
            mainHeroSpriteArray[0],
            
        ];
        
    }
        
        /////       Realize touches         /////
        
 
        
    var rightButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {
                
                cc.log("RightButtonTouch");
                
                var target = event.getCurrentTarget();
    
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                    var point = mainSprite.getPosition();
                    
                    target.setOpacity(250);
                    
                    var rightMove = new cc.moveTo(0.3, mainSprite.getPositionX() + 11, mainSprite.getPositionY());
                    
                    if (boolRightAnimate) {    
                        var animation = new cc.Animation(rightAnimateArray1, 0.3, 1);
                        boolRightAnimate = true;
                    } else {
                        var animation = new cc.Animation(rightAnimateArray2, 0.3, 1);
                        boolRightAnimate = false;
                    }
                    
                    var animate = new cc.Animate(animation);
                    var rightSpawn = new cc.Spawn(rightMove, animate);
                    
                    mainSprite.runAction(rightSpawn);
                    
                    return true;
                }
                
                return true;
            },
            
            onTouchEnded: function (touch, event) {
                
                cc.log("RightTouchEnd");
                
                if (boolRightAnimate) {
                    boolRightAnimate = false;
                } else {
                    boolRightAnimate = true;
                }
                
                var target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });
        
        
        
    var leftButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
    
            onTouchBegan: function (touch, event) {
    
                cc.log("LeftButtonTouch");
                
                var target = event.getCurrentTarget();
    
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
                if(cc.rectContainsPoint(rect, locationInNode)){
                    var point = mainSprite.getPosition();
                    
                    target.setOpacity(250);
                    
                    var leftMove = new cc.moveTo(0.3, mainSprite.getPositionX() - 11, mainSprite.getPositionY());
                    
                    if (boolLeftAnimate) {    
                        var animation = new cc.Animation(leftAnimateArray1, 0.3, 1);
                        boolLeftAnimate = true;
                    } else {
                        var animation = new cc.Animation(leftAnimateArray2, 0.3, 1);
                        boolLeftAnimate = false;
                    }
                    
                    var animate = new cc.Animate(animation);
                    var leftSpawn = new cc.Spawn(leftMove, animate);
                    
                    mainSprite.runAction(leftSpawn);
                    
                    return true;
                }
                
                return true;
            },
         
            onTouchEnded: function (touch, event) {
                
                cc.log("LeftTouchEnd");
                
                if (boolLeftAnimate) {
                    boolLeftAnimate = false;
                } else {
                    boolLeftAnimate = true;
                }
                
                var target = event.getCurrentTarget();
                target.setOpacity(150);
                
            },
            
        });
        
        
    
    var upButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {
                
                cc.log("UpButtonTouch");
                
                var target = event.getCurrentTarget();
    
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                    var point = mainSprite.getPosition();
                    
                    target.setOpacity(250);
                    
                    var upMove = new cc.moveTo(0.3, mainSprite.getPositionX(), mainSprite.getPositionY() + 11);
                    
                    if (boolUpAnimate) {    
                        var animation = new cc.Animation(upAnimateArray1, 0.3, 1);
                        boolUpAnimate = true;
                    } else {
                        var animation = new cc.Animation(upAnimateArray2, 0.3, 1);
                        boolUpAnimate = false;
                    }
                    
                    var animate = new cc.Animate(animation);
                    var upSpawn = new cc.Spawn(upMove, animate);
                    
                    mainSprite.runAction(upSpawn);
                    
                    return true;
                }
                
                return true;
            },
            
            onTouchEnded: function (touch, event) {
                
                cc.log("UpTouchEnd");
                
                if (boolUpAnimate) {
                    boolUpAnimate = false;
                } else {
                    boolUpAnimate = true;
                }
                
                var target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });
        
        
    var downButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {
                
                cc.log("DownButtonTouch");
                
                var target = event.getCurrentTarget();
    
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                    var point = mainSprite.getPosition();
                    
                    target.setOpacity(250);
                    
                    var downMove = new cc.moveTo(0.3, mainSprite.getPositionX(), mainSprite.getPositionY() - 11);
                    
                    if (boolDownAnimate) {    
                        var animation = new cc.Animation(downAnimateArray1, 0.3, 1);
                        boolDownAnimate = true;
                    } else {
                        var animation = new cc.Animation(downAnimateArray2, 0.3, 1);
                        booldownAnimate = false;
                    }
                    
                    var animate = new cc.Animate(animation);
                    var downSpawn = new cc.Spawn(downMove, animate);
                    
                    mainSprite.runAction(downSpawn);
                    
                    return true;
                }
                
                return true;
            },
            
            onTouchEnded: function (touch, event) {
                
                cc.log("DownTouchEnd");
                
                if (boolDownAnimate) {
                    boolDownAnimate = false;
                } else {
                    boolDownAnimate = true;
                }
                
                var target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });
        
    cc.eventManager.addListener(downButtonListener, ButtonDown);    
    cc.eventManager.addListener(upButtonListener, ButtonUp);
    cc.eventManager.addListener(leftButtonListener, ButtonLeft);
    cc.eventManager.addListener(rightButtonListener, ButtonRight);
        
    }

});

