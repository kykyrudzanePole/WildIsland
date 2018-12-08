////            inizialise varibles             ////

{

var size = cc.winSize;
var center;
var play_width;
var play_height;
    
var mainHeroSpriteArray = [];

var ButtonDown;
var ButtonUp;
var ButtonLeft;
var ButtonRight;

var mainSprite;
var tmxTiledMap;

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

var longTouchTimerConst = 0.1;
var checkTouchTime = 0;
var onTouch = false;
var longTouch = false;
var flagLongTouch = true;
var stop = false;
var longTouchX;
var longTouchY;
var longTouchDirection;                
var animationLongTouch;
var flagLongTouchChange;
var repeat;
var endConst = 0;
var checkTimer = 0;
var endActionTime = 0;
var endCheck = false;

var rightLongAnimateArray = [];
var leftLongAnimateArray = [];
var upLongAnimateArray = [];
var downLongAnimateArray = [];

var target;
var locationInNode;
var s;
var rect;

var rectSchedule;
var locationInNodeSchedule;
var touchSchedule;
var eventSchedule;
var sSchedule;
var targetSchedule;
    
}

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        
        var controller = new ControllerLayer();
        this.addChild(controller, 2);
        
        var layer = new GameLayer();
        this.addChild(layer, 1);
        
        
    }
});


//      create layer for four buttons for manage      //
var ControllerLayer = cc.Layer.extend({
    ctor: function () {
        
        this._super();
        
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
    
});


var GameLayer = cc.Layer.extend({
    ctor:function () {

        this._super();
        
        
        //      create tile map //
        tmxTiledMap = new cc.TMXTiledMap("res/MainMap.tmx");
        tmxTiledMap.setScale(0.8);
        this.addChild(tmxTiledMap);
        
        center = new cc.Point(size.width / 2, size.height / 2);
        
        //      create hero sprite //
        mainSprite = new cc.Sprite("res/nakedMan1.png");
        mainSprite.setPosition(center);
        mainSprite.setScale(2);
        
        this.addChild(mainSprite, 5); 
        
        var play_width = center.width;
        var play_height = center.height;
        
        cc.log(center.x);
        cc.log(center.y);
        cc.log(center.width);
        cc.log(center.height );
        
        this.runAction(cc.Follow.create(mainSprite, new cc.Rect(center.x - play_width / 2, center.y - play_height / 2, play_width, play_height)));     
    
        /////       downlod sprites to the spriteFrameCache, create textureCache and animationFrame   /////
        
    {        
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
        
        
        rightLongAnimateArray = [
            
            mainHeroSpriteArray[8],
            mainHeroSpriteArray[6],
            mainHeroSpriteArray[7],
            mainHeroSpriteArray[6],
            
        ];
        
        leftLongAnimateArray = [
            
            mainHeroSpriteArray[5],
            mainHeroSpriteArray[3],
            mainHeroSpriteArray[4],
            mainHeroSpriteArray[3],
        
        ]; 
        
        upLongAnimateArray = [
        
            mainHeroSpriteArray[10],
            mainHeroSpriteArray[9],
            mainHeroSpriteArray[11],
            mainHeroSpriteArray[9],
        
        ];
        
        downLongAnimateArray = [
             
            mainHeroSpriteArray[2],
            mainHeroSpriteArray[0],
            mainHeroSpriteArray[1],
            mainHeroSpriteArray[0],
            
        ]
        
    }
        
        /////       Realize  touches         /////
        
    var rightButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {

                target = event.getCurrentTarget();
    
                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    flagLongTouch = true;
                    onTouch = true;
                    
                    longTouchX = 11;
                    longTouchY = 0;
                    longTouchDirection = 1;
                    
                    
                    target.setOpacity(250);       
                       
                    return true;
                    
                 }
                     
                 return true;
                
            },
            
            onTouchEnded: function (touch, event) {
                
                stop = true;
                
                if (boolRightAnimate) {
                    boolRightAnimate = false;
                } else {
                    boolRightAnimate = true;
                }
                
                target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });
        
        
    var leftButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
    
            onTouchBegan: function (touch, event) {
                
                target = event.getCurrentTarget();
    
                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);
                
                if(cc.rectContainsPoint(rect, locationInNode)){
                                       
                    flagLongTouch = true;
                    onTouch = true;
                    
                    longTouchX = -11;
                    longTouchY = 0;
                    longTouchDirection = 2;
                    
                    target.setOpacity(250);
                    
                    return true;
                }
                
                return true;
            },
         
            onTouchEnded: function (touch, event) {
                
                stop = true;
                
                if (boolLeftAnimate) {
                    boolLeftAnimate = false;
                } else {
                    boolLeftAnimate = true;
                }
                
                target = event.getCurrentTarget();
                target.setOpacity(150);
                
            },
            
        });
        
    
    var upButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {
                
                target = event.getCurrentTarget();
    
                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                                    
                    flagLongTouch = true;
                    onTouch = true;

                    longTouchX = 0;
                    longTouchY = 11;
                    longTouchDirection = 3;
                    
                    target.setOpacity(250);
                    
                    return true;
                }
                
                
                return true;
            },
        
            
            onTouchEnded: function (touch, event) {
                
                stop = true;
                
                if (boolUpAnimate) {
                    boolUpAnimate = false;
                } else {
                    boolUpAnimate = true;
                }
                
                target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });
        
        
    var downButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {
        
                target = event.getCurrentTarget();
    
                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                    flagLongTouch = true;
                    onTouch = true;
                    
                    longTouchX = 0;
                    longTouchY = -11;
                    longTouchDirection = 4;
                    
                    target.setOpacity(250);
                    
                    return true;
                }
                
                return true;
            },
            
            onTouchEnded: function (touch, event) {
                
                stop = true;
                
                if (boolDownAnimate) {
                    boolDownAnimate = false;
                } else {
                    boolDownAnimate = true;
                }
                
                target = event.getCurrentTarget();
                target.setOpacity(150);
                
            }
        });        
        
        
    ////          Add listeners               ////
        
    cc.eventManager.addListener(downButtonListener, ButtonDown);    
    cc.eventManager.addListener(upButtonListener, ButtonUp);
    cc.eventManager.addListener(leftButtonListener, ButtonLeft);
    cc.eventManager.addListener(rightButtonListener, ButtonRight);    
        
    this.schedule(this.updateLongTouch);
        
    },
    
    ////            Create timer for long touch             ////
    
    updateLongTouch: function (dt) {
        
        cc.log(mainSprite.getPositionX());
        cc.log(tmxTiledMap.getPositionX());
        
        if (mainSprite.getPositionX() < 400 || mainSprite.getPositionX() > 800) {
            
            this.stopAllActions();
            
            //this.runAction(cc.Follow.create(mainSprite, new cc.Rect(center.x - play_height / 2, center.y - play_height / 2, 0, play_height)));   
            
        }
           
        if (stop === true) {

            endConst = 0.4 - checkTimer;
            
            endActionTime += dt;
            
            if (endActionTime > endConst) {
                
                stopAction();
            
            } 
        }
        
        if (onTouch === true) {
             
            var followAction = new cc.Follow(mainSprite);
            tmxTiledMap.runAction(cc.follow(mainSprite));
            
            checkTouchTime += dt;
            
            if (checkTouchTime > longTouchTimerConst) {
                
                checkTimer += dt;
                
                if (checkTimer > 0.4) {
                    checkTimer = 0;    
                } 
                
                var go = new onLoad();
                
            }
        
        }
    }
});

    ////            Logic for long touch                    ////

    var onLoad = cc.Action.extend({
    ctor : function () {
        
        this._super();
        
        if (!stop === true) {
            
            if (flagLongTouch === true) {
                
                flagLongTouch = false;    
                
                switch (longTouchDirection) {
                    
                    case 1: 
                            
                        animationLongTouch = new cc.Animation(rightLongAnimateArray, 0.2);
                        
                        break;
                    
                    case 2:
                        
                        animationLongTouch = new cc.Animation(leftLongAnimateArray, 0.2);
                        
                        break;
                    
                    case 3:
                        
                        animationLongTouch = new cc.Animation(upLongAnimateArray, 0.2);
                        
                        break;
                        
                    case 4:
                        
                        animationLongTouch = new cc.Animation(downLongAnimateArray, 0.2);
                        
                        break;
                        
                    default: 
                        
                        break;
                }
                
                
                var animateLongTouch = new cc.Animate(animationLongTouch);
                
                var moveRepeat = new cc.moveBy(0.8, 4 * (longTouchX + longTouchX), 4 * (longTouchY + longTouchY));
                
                repeat = new cc.RepeatForever(cc.spawn(moveRepeat, animateLongTouch));
                
                mainSprite.runAction(repeat);    
    
            }
            
        }
        
    }
});


    var stopAction = function () {
    
    mainSprite.stopAllActions();

    endConst = 0;
    endActionTime = 0;
    checkTimer = 0;
    onTouch = false;
    checkTouchTime = 0;
    stop = false;
    
}