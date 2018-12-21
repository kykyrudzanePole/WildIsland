////            inizialise varibles             ////

{
var spawnChase;    

var flag = true;    
var gameOverFlag = false;
var checkAutor = false;
var authorFlag = false;
var authorTimer = 0;    

var leftButton;    
var rightButton;
var upButton;
var downButton;    
    
var work_stone;    
var stoneCountCheck = 1;    
var stoneCount = 0;    
    
var downAction;
var upAction;
var rightAction;
var leftAction;
var stoneLabel;
    
var size = cc.winSize;
var center;
var play_width;
var play_height;
    
var mainHeroSpriteArray = [];

var ButtonDown;
var ButtonUp;
var ButtonLeft;
var ButtonRight;
var ButtonCenter;

var mainSprite2;    
    
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

var longTouchTimerConst = 0;
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
    
var equipeFlag = false;
var itemLayerFlag = false;
var menuFlag = false;    
var equipeMenu;
var equipeBackground; 
    
var bearArray = [];  
    
var bearDownAnimateArray = [];    
var bearUpAnimateArray = [];
var bearRightAnimateArray = [];
var bearLeftAnimateArray = [];    
    
var bearSprite;
var bearFlag = false;
var fuckingBear = true;
var karakos_karakas;
    
var endTime = 1;
    
}

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var controller = new ControllerLayer();
        this.addChild(controller, 2);
        
        var layer = new GameLayer();
        this.addChild(layer, 1);
        
        var equipe = new EquipeLayer();
        this.addChild(equipe, 1);
        
        var items = new ItemLayer();
        this.addChild(items, 1);
        
        var gameOver = new GameOver();
        this.addChild(gameOver, 5);
        
        var author = new Author();
        this.addChild(author, 5);
        
    }
});

var ItemLayer = cc.Layer.extend({
    
    ctor : function () {
        
        this._super();
        
        this.setVisible(false);
        
        var wood = new cc.Sprite("res/wood.png");
        wood.setAnchorPoint(0.5, 0.5);
        wood.setPosition(equipeBackground.getPositionX() - 160, equipeBackground.getPositionY() + 40);
        
        var woodLabel = new cc.LabelTTF("0", "Arial", 16);
        woodLabel.setPosition(equipeBackground.getPositionX() - 120, equipeBackground.getPositionY() + 70);
        
        this.addChild(woodLabel);
        this.addChild(wood);
        
        var stone = new cc.Sprite("res/stone.png");
        stone.setAnchorPoint(0.5, 0.5);
        stone.setPosition(equipeBackground.getPositionX() - 70, equipeBackground.getPositionY() + 40);
        stone.setScale(1.25);
        
        stoneLabel = new cc.LabelTTF("0", "Arial", 16);
        stoneLabel.setPosition(equipeBackground.getPositionX() - 30, equipeBackground.getPositionY() + 70);
        
        this.addChild(stoneLabel);
        this.addChild(stone);
        
        var grass = new cc.Sprite("res/grass.png");
        grass.setAnchorPoint(0.5, 0.5);
        grass.setPosition(equipeBackground.getPositionX() + 10, equipeBackground.getPositionY() + 40);
        
        var grassLabel = new cc.LabelTTF("0", "Arial", 16);
        grassLabel.setPosition(equipeBackground.getPositionX() + 50, equipeBackground.getPositionY() + 70);
        grass.setScale(1.25);
        
        this.addChild(grassLabel);
        this.addChild(grass);
        
        this.scheduleUpdate()
    
    },
    
    update: function () {
        
        if (itemLayerFlag === true) {
            
            this.setVisible(true);
            
        } else {
            
            this.setVisible(false);
            
        }
        
        if (stoneCount === stoneCountCheck) {
            
            stoneCountCheck++;        
            stoneLabel.setString(stoneCount);
            
        }
    }
    
});

var EquipeLayer = cc.Layer.extend({
    
    ctor: function () {
        
        this._super();
        
        this.setVisible(false);
        
        equipeBackground = new cc.Sprite("res/blackEquipe.png");
        
        equipeBackground.setPosition(size.width / 4, size.height / 2);
        equipeBackground.setScale(2);
        equipeBackground.setOpacity(200);
        equipeBackground.setAnchorPoint(0.5, 0.5)
        
        this.addChild(equipeBackground);
        
        var equipeMainSprite = new cc.Sprite("res/nakedMan1.png");
        equipeMainSprite.setScale(3);
        equipeMainSprite.setAnchorPoint(0.5, 0.5);
        equipeMainSprite.setPosition(equipeBackground.getPositionX(), equipeBackground.getPositionY() + 220);
        
        this.addChild(equipeMainSprite);
        
        
        var equipeAnimation = new cc.Animation(mainHeroSpriteArray, 0.2);
        var equipeAnimate = new cc.Animate(equipeAnimation);
        var equipeReapeat = new cc.RepeatForever(equipeAnimate);
        
        equipeMainSprite.runAction(equipeReapeat);
    
        var itemMenu = new cc.MenuItemImage("res/items.png", "res/items_selected.png", "res/items.png",  this.items, this);     
        var instructionMenu = new cc.MenuItemImage("res/instruction.png",  "res/instruction_selected.png", "res/instruction.png", this.instruction, this);
    
        equipeMenu = new cc.Menu(itemMenu, instructionMenu);
        equipeMenu.setAnchorPoint(0.5, 0.5);
        equipeMenu.setContentSize(cc.size(150, 150));
        equipeMenu.setPosition(equipeBackground.getPositionX(), equipeBackground.getPositionY());
        
        instructionMenu.setPosition(0, 0);
        instructionMenu.setScale(1.25);
        itemMenu.setPosition(0, 40);
        
        equipeMenu.setVisible(false);
        
        this.addChild(equipeMenu);
        
        this.scheduleUpdate();
        
    },
    
    items: function () {
        
        menuFlag = false;
        equipeMenu.setVisible(false);
        
        itemLayerFlag = true;
        
    },
    
    instruction: function () {
        
        
        
    },
    
    update: function () {
        
        if (equipeFlag === true) { 
        
            this.setVisible(true);
            
        } else {
            
            this.setVisible(false);
            
        }
        
        if (menuFlag === true) {

            equipeMenu.setVisible(true);
            
        }
        
    }
    
})

//      create layer for four buttons for manage      //
var ControllerLayer = cc.Layer.extend({
    ctor: function () {
        
        this._super();
        
        ButtonDown = new cc.Sprite("res/ButtonDown.png");
        ButtonDown.setPosition(size.width / 1.2, size.height / 7.8);
        ButtonDown.setScale(0.5);
        ButtonDown.setOpacity(150);
        
        this.addChild(ButtonDown, 2);

        ButtonLeft = new cc.Sprite("res/ButtonLeft.png");
        ButtonLeft.setPosition(size.width / 1.3, size.height / 4.5);
        ButtonLeft.setScale(0.5);
        ButtonLeft.setOpacity(150);
        
        this.addChild(ButtonLeft, 2);

        ButtonRight = new cc.Sprite("res/ButtonRight.png");
        ButtonRight.setPosition(size.width / 1.114, size.height / 4.5);
        ButtonRight.setScale(0.5);
        ButtonRight.setOpacity(150);
        
        this.addChild(ButtonRight, 2);

        ButtonUp = new cc.Sprite("res/ButtonUp.png");
        ButtonUp.setPosition(size.width / 1.2, size.height / 3.2);
        ButtonUp.setScale(0.5);
        ButtonUp.setOpacity(150);
        
        this.addChild(ButtonUp, 2);
        
        ButtonCenter = new cc.Sprite("res/MoveControllerCircle.png");
        ButtonCenter.setPosition(size.width / 1.2, size.height / 4.55);
        ButtonCenter.setScale(2);
        ButtonCenter.setOpacity(150);
        
        this.addChild(ButtonCenter, 2);
        
        ButtonRemove = new cc.Sprite("res/MoveControllerCircle.png");
        ButtonRemove.setPosition(200, 200);
        ButtonRemove.setScale(2);
        ButtonRemove.setOpacity(150);
        
        this.addChild(ButtonRemove, 2);
        
    }
    
});


var GameLayer = cc.Layer.extend({
    ctor:function () {

        this._super();
        
        //      create tile map //
        tmxTiledMap = new cc.TMXTiledMap("res/MainMap.tmx");
        tmxTiledMap.setScale(0.35);
        
        this.addChild(tmxTiledMap);
        
        work_stone = tmxTiledMap.getLayer("cocos_and_stars");
        
        var tmxScale = new cc.ScaleTo(1.5, 0.5);
        var fadeSprite = cc.fadeTo(2, 250);
        
        tmxTiledMap.runAction(tmxScale);
        
        center = cc.p(size.width / 2, size.height / 2);
        
        //      create hero sprite //
        mainSprite = new cc.Sprite("res/nakedMan1.png");
        mainSprite.setOpacity(0);
        mainSprite.setPosition(center);
        mainSprite.setScale(1.5);
        
        this.addChild(mainSprite,5);
        
        mainSprite.runAction(fadeSprite);
        
        this.runAction(cc.Follow.create(mainSprite, new cc.Rect(center.x - play_width / 2, center.y - play_height / 2, play_width, play_height)));     

        bearSprite = new cc.Sprite("res/bear1.png");
        
        bearSprite.setScale(3.5);
        bearSprite.setPosition(800,3000);
        bearSprite.setAnchorPoint(0.5, 0.5);
        
        tmxTiledMap.addChild(bearSprite, 6);
        
        karakos_karakas = new cc.Sprite("res/bear1.png");
        
        karakos_karakas.setScale(1.5);
        karakos_karakas.setPosition(2300,1500);
        karakos_karakas.setAnchorPoint(0.5, 0.5);
        
        tmxTiledMap.addChild(karakos_karakas, 6);
        
        ////                bear initialize             ////
        
        {     
        
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(0, 0, 42, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(468, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(525, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(582, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(42, 0, 42, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(84, 0, 42, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(126, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(183, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(240, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(297, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(354, 0, 57, 62)));
        bearArray.push(new cc.SpriteFrame("res/bearImage.png", cc.rect(411, 0, 57, 62)));
        
             
        bearDownAnimateArray = [
            
            bearArray[0],
            bearArray[4],
            bearArray[5]
            
        ]; 
        
        bearLeftAnimateArray = [
            
            bearArray[6],
            bearArray[7],
            bearArray[8]
            
        ]; 
        
        bearUpAnimateArray = [
            
            bearArray[9],
            bearArray[10],
            bearArray[11]
            
        ]; 
        
        bearRightAnimateArray = [
            
            bearArray[1],
            bearArray[2],
            bearArray[3]
            
        ]; 
        
        
  }         
   
        {
        var bearRightAnimation = new cc.Animation(bearRightAnimateArray, 0.2);
        var bearRightAnimate = new cc.Animate(bearRightAnimation);
        
        var bearLeftAnimation = new cc.Animation(bearLeftAnimateArray, 0.2);
        var bearLeftAnimate = new cc.Animate(bearLeftAnimation);
        
        var bearUpAnimation = new cc.Animation(bearUpAnimateArray, 0.2);
        var bearUpAnimate = new cc.Animate(bearUpAnimation);
        
        var bearDownAnimation = new cc.Animation(bearDownAnimateArray, 0.2);
        var bearDownAnimate = new cc.Animate(bearDownAnimation);
        
        var bearMove = cc.sequence(cc.spawn(cc.moveBy(4, 900, 0), cc.sequence(bearRightAnimate, bearRightAnimate, bearRightAnimate, bearRightAnimate, bearRightAnimate, bearRightAnimate)), cc.spawn(cc.moveBy(4, -900, 0), cc.sequence(bearLeftAnimate, bearLeftAnimate, bearLeftAnimate, bearLeftAnimate, bearLeftAnimate, bearLeftAnimate)));
        
        var kyky = cc.sequence(cc.spawn(cc.moveBy(4, 0, 900), cc.sequence(bearUpAnimate, bearUpAnimate, bearUpAnimate, bearUpAnimate, bearUpAnimate, bearUpAnimate)), cc.spawn(cc.moveBy(4, 0, -900), cc.sequence(bearDownAnimate, bearDownAnimate, bearDownAnimate, bearDownAnimate, bearDownAnimate, bearDownAnimate)));
        
        var justDoIT = cc.repeatForever(kyky);  
        
        var fuckingBear1 = cc.repeatForever(bearMove);    
        
        bearSprite.runAction(fuckingBear1);
        
        karakos_karakas.runAction(justDoIT);
        }
        
        
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
        var removeListener = cc.EventListener.create({

            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,

            onTouchBegan: function (touch, event) {

                target = event.getCurrentTarget();

                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);

                if(cc.rectContainsPoint(rect, locationInNode)){

                    removeClick = true;

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
        
    var rightButtonListener = cc.EventListener.create({
            
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            
            onTouchBegan: function (touch, event) {

                target = event.getCurrentTarget();
    
                locationInNode = target.convertToNodeSpace(touch.getLocation());
                s = target.getContentSize();
                rect = cc.rect(0, 0, s.width, s.height);
                
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    
                    authorFlag = false;
                    
                    rightAction = true;
                    rightButton = true;

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
                    
                    leftAction = true;
                    leftButton = true;
                                       
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
                    
                                   
                    upAction = true;
                    upButton = true;
                
                                    
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
                    
                                   
                    downAction = true;
                    downButton = true;
                
                    
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
        
    var centerButtonListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        
        onTouchBegan: function (touch, event) {
            
            target = event.getCurrentTarget();
    
            locationInNode = target.convertToNodeSpace(touch.getLocation());
            s = target.getContentSize();
            rect = cc.rect(0, 0, s.width, s.height);
            
            if (cc.rectContainsPoint(rect, locationInNode)) {
            
                target.setOpacity(250);
                
                if (equipeFlag === true) {
                    
                    equipeFlag = false;
                    
                } else {
                
                    equipeFlag = true;
                    
                }
                
                if (menuFlag === true) {
                    
                    menuFlag = false;
                    
                } else {
                
                    menuFlag = true;
                    
                }
                    
                itemLayerFlag = false;               
    
                return true;
            }
            
            return true;
        },
        
        onTouchEnded: function (touch, event) { 
             
            target = event.getCurrentTarget();
            target.setOpacity(150);
                
        }
    });    
        
    ////          Add listeners               ////
        
    cc.eventManager.addListener(downButtonListener, ButtonDown);    
    cc.eventManager.addListener(upButtonListener, ButtonUp);
    cc.eventManager.addListener(leftButtonListener, ButtonLeft);
    cc.eventManager.addListener(rightButtonListener, ButtonRight); 
    cc.eventManager.addListener(centerButtonListener, ButtonCenter); 
    cc.eventManager.addListener(removeListener, ButtonRemove);
        
    this.schedule(this.updateLongTouch);
    this.schedule(this.endGame, 1);
        
    },
    
    ////            Create timer for long touch             ////
    
    updateLongTouch: function (dt) {
        
        
        var point = mainSprite.getPosition();


        //first tree
        
        if (mainSprite.getPositionX()<=334 && mainSprite.getPositionY()>1000){
            if(leftButton){
                if(leftAction){
                    mainSprite.setPosition(point.x+7,point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                    authorFlag = true;
                }
            }
        }

        if (mainSprite.getPositionX() <= 347 && mainSprite.getPositionY() >= 586 && mainSprite.getPositionY() <= 670) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }

        if (mainSprite.getPositionX() <= 347 && mainSprite.getPositionY() >= 610  && mainSprite.getPositionY() <= 670) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() <= 347 && mainSprite.getPositionY() >= 610&& mainSprite.getPositionY() <= 670) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }

        //second tree
        if (mainSprite.getPositionX() >= 498 && mainSprite.getPositionX() <= 530 && mainSprite.getPositionY() >= 698 && mainSprite.getPositionY() <= 745) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 498 && mainSprite.getPositionX() <= 530 && mainSprite.getPositionY() >= 698 && mainSprite.getPositionY() <= 745) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 498 && mainSprite.getPositionX() <= 530 && mainSprite.getPositionY() >= 698 && mainSprite.getPositionY() <= 745) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 498 && mainSprite.getPositionX() <= 530 && mainSprite.getPositionY() >= 698 && mainSprite.getPositionY() <= 745) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }

        //third tree
        if (mainSprite.getPositionX() >= 395 && mainSprite.getPositionX() <= 440 && mainSprite.getPositionY() >= 745 && mainSprite.getPositionY() <= 800) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 395 && mainSprite.getPositionX() <= 440 && mainSprite.getPositionY() >= 745 && mainSprite.getPositionY() <= 800) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 395 && mainSprite.getPositionX() <= 440 && mainSprite.getPositionY() >= 745 && mainSprite.getPositionY() <= 800) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 395 && mainSprite.getPositionX() <= 440 && mainSprite.getPositionY() >= 745 && mainSprite.getPositionY() <= 800) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //fourth tree
        if (mainSprite.getPositionX() >= 344 && mainSprite.getPositionX() <= 376 && mainSprite.getPositionY() >= 845 && mainSprite.getPositionY() <= 895) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 344 && mainSprite.getPositionX() <= 376 && mainSprite.getPositionY() >= 845 && mainSprite.getPositionY() <= 895) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 344 && mainSprite.getPositionX() <= 376 && mainSprite.getPositionY() >= 845 && mainSprite.getPositionY() <= 895) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 344 && mainSprite.getPositionX() <= 376 && mainSprite.getPositionY() >= 845 && mainSprite.getPositionY() <= 895) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }

        //fifth tree

        if (mainSprite.getPositionX() >= 328 && mainSprite.getPositionX() <= 352 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 328 && mainSprite.getPositionX() <= 352 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 328 && mainSprite.getPositionX() <= 352 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 328 && mainSprite.getPositionX() <= 352 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }

        // sixth tree

        if (mainSprite.getPositionX() >= 362 && mainSprite.getPositionX() <= 397 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 362 && mainSprite.getPositionX() <= 397 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 362 && mainSprite.getPositionX() <= 397 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 362 && mainSprite.getPositionX() <= 397 && mainSprite.getPositionY() >= 942 && mainSprite.getPositionY() <= 997) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //seventh tree
        if (mainSprite.getPositionX() >= 511 && mainSprite.getPositionX() <= 553 && mainSprite.getPositionY() >= 865 && mainSprite.getPositionY() <= 900) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 511 && mainSprite.getPositionX() <= 553 && mainSprite.getPositionY() >= 865 && mainSprite.getPositionY() <= 900) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 511 && mainSprite.getPositionX() <= 553 && mainSprite.getPositionY() >= 865 && mainSprite.getPositionY() <= 900) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 511 && mainSprite.getPositionX() <= 553 && mainSprite.getPositionY() >= 865 && mainSprite.getPositionY() <= 900) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }

        //eight tree
        if (mainSprite.getPositionX() >= 608 && mainSprite.getPositionX() <= 676 && mainSprite.getPositionY() >= 738 && mainSprite.getPositionY() <= 805) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 608 && mainSprite.getPositionX() <= 676 && mainSprite.getPositionY() >= 738 && mainSprite.getPositionY() <= 805) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 608 && mainSprite.getPositionX() <= 676 && mainSprite.getPositionY() >= 738 && mainSprite.getPositionY() <= 805) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 608 && mainSprite.getPositionX() <= 676 && mainSprite.getPositionY() >= 738 && mainSprite.getPositionY() <= 805) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //ninth tree
        if (mainSprite.getPositionX() >= 698 && mainSprite.getPositionX() <= 740 && mainSprite.getPositionY() >= 608 && mainSprite.getPositionY() <= 656) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 698 && mainSprite.getPositionX() <= 740 && mainSprite.getPositionY() >= 608 && mainSprite.getPositionY() <= 656) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 698 && mainSprite.getPositionX() <= 740 && mainSprite.getPositionY() >= 608 && mainSprite.getPositionY() <= 656) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 698 && mainSprite.getPositionX() <= 740 && mainSprite.getPositionY() >= 608 && mainSprite.getPositionY() <= 656) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //tenth
        if (mainSprite.getPositionX() >= 778 && mainSprite.getPositionX() <= 805 && mainSprite.getPositionY() >= 762 && mainSprite.getPositionY() <= 815) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 778 && mainSprite.getPositionX() <= 805 && mainSprite.getPositionY() >= 762 && mainSprite.getPositionY() <= 815) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 778 && mainSprite.getPositionX() <= 805 && mainSprite.getPositionY() >= 762 && mainSprite.getPositionY() <= 815) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 778 && mainSprite.getPositionX() <= 805 && mainSprite.getPositionY() >= 762 && mainSprite.getPositionY() <= 815) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //eleventh
        if (mainSprite.getPositionX() >= 703 && mainSprite.getPositionX() <= 766 && mainSprite.getPositionY() >= 890 && mainSprite.getPositionY() <= 954) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 703 && mainSprite.getPositionX() <= 766 && mainSprite.getPositionY() >= 890 && mainSprite.getPositionY() <= 954) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 703 && mainSprite.getPositionX() <= 766 && mainSprite.getPositionY() >= 890 && mainSprite.getPositionY() <= 954) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 703 && mainSprite.getPositionX() <= 766 && mainSprite.getPositionY() >= 890 && mainSprite.getPositionY() <= 954) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //twelfth tree
        if (mainSprite.getPositionX() >= 911 && mainSprite.getPositionX() <= 939 && mainSprite.getPositionY() >= 957 && mainSprite.getPositionY() <= 1005) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 911 && mainSprite.getPositionX() <= 939 && mainSprite.getPositionY() >= 957 && mainSprite.getPositionY() <= 1005) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 911 && mainSprite.getPositionX() <= 939 && mainSprite.getPositionY() >= 957 && mainSprite.getPositionY() <= 1005) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 911 && mainSprite.getPositionX() <= 939 && mainSprite.getPositionY() >= 957 && mainSprite.getPositionY() <= 1005) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //thirteenth tree
        if (mainSprite.getPositionX() >= 1005 && mainSprite.getPositionX() <= 1040 && mainSprite.getPositionY() >= 944 && mainSprite.getPositionY() <= 996) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 1005 && mainSprite.getPositionX() <= 1040 && mainSprite.getPositionY() >= 944 && mainSprite.getPositionY() <= 996) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 1005 && mainSprite.getPositionX() <= 1040 && mainSprite.getPositionY() >= 944 && mainSprite.getPositionY() <= 996) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 1005 && mainSprite.getPositionX() <= 1040 && mainSprite.getPositionY() >= 944 && mainSprite.getPositionY() <= 996) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //fourteenth tree
        if (mainSprite.getPositionX() >= 937 && mainSprite.getPositionX() <= 961 && mainSprite.getPositionY() >= 832 && mainSprite.getPositionY() <= 907) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 937 && mainSprite.getPositionX() <= 961 && mainSprite.getPositionY() >= 832 && mainSprite.getPositionY() <= 907) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 937 && mainSprite.getPositionX() <= 961 && mainSprite.getPositionY() >= 832 && mainSprite.getPositionY() <= 907) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 937 && mainSprite.getPositionX() <= 961 && mainSprite.getPositionY() >= 832 && mainSprite.getPositionY() <= 907) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //fifteenth tree
        if (mainSprite.getPositionX() >= 914 && mainSprite.getPositionX() <= 952 && mainSprite.getPositionY() >= 584 && mainSprite.getPositionY() <= 659) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 914 && mainSprite.getPositionX() <= 952 && mainSprite.getPositionY() >= 584 && mainSprite.getPositionY() <= 659) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 914 && mainSprite.getPositionX() <= 952 && mainSprite.getPositionY() >= 584 && mainSprite.getPositionY() <= 659) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 914 && mainSprite.getPositionX() <= 952 && mainSprite.getPositionY() >= 584 && mainSprite.getPositionY() <= 659) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //sixteenth tree
        if (mainSprite.getPositionX() >= 1017 && mainSprite.getPositionX() <= 1044 && mainSprite.getPositionY() >= 588 && mainSprite.getPositionY() <= 674) {
            if (leftButton) {
                if (leftAction) {
                    mainSprite.setPosition(point.x+5, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }

                leftButton = false;
            }
        }
        if (mainSprite.getPositionX() >= 1017 && mainSprite.getPositionX() <= 1044 && mainSprite.getPositionY() >= 588 && mainSprite.getPositionY() <= 674) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 1017 && mainSprite.getPositionX() <= 1044 && mainSprite.getPositionY() >= 588 && mainSprite.getPositionY() <= 674) {
            if (downButton) {
                if (downAction) {
                    mainSprite.setPosition(point.x, point.y+7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 1017 && mainSprite.getPositionX() <= 1044 && mainSprite.getPositionY() >= 588 && mainSprite.getPositionY() <= 674) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //sunduk
        if (mainSprite.getPositionX() >= 1078 && mainSprite.getPositionY() >= 992) {
            if (rightButton) {
                if (rightAction) {
                    mainSprite.setPosition(point.x-7, point.y);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        if (mainSprite.getPositionX() >= 1078 && mainSprite.getPositionY() >= 992) {
            if (upButton) {
                if (upAction) {
                    mainSprite.setPosition(point.x, point.y-7);
                    cc.log("Actions stop");
                    mainSprite.stopAllActions();
                }
            }
        }
        //stone
        if(mainSprite.getPositionX() >= 400 && mainSprite.getPositionX()<=500 && mainSprite.getPositionY()>=320 && mainSprite.getPositionY()<=450 && removeClick == true){

            work_stone.removeTileAt(20,77);
            work_stone.removeTileAt(20,76);
            work_stone.removeTileAt(21,77);
            work_stone.removeTileAt(21,76);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;

        }
        if(mainSprite.getPositionX() >= 240 && mainSprite.getPositionX()<=400 && mainSprite.getPositionY()>=440 && mainSprite.getPositionY()<=540 && removeClick == true){

            work_stone.removeTileAt(3,63);
            work_stone.removeTileAt(3,62);
            work_stone.removeTileAt(4,63);
            work_stone.removeTileAt(4,62);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 350 && mainSprite.getPositionX()<=500 && mainSprite.getPositionY()>=635 && mainSprite.getPositionY()<=670 && removeClick == true){

            work_stone.removeTileAt(12,46);
            work_stone.removeTileAt(12,47);
            work_stone.removeTileAt(13,46);
            work_stone.removeTileAt(13,47);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 300 && mainSprite.getPositionX()<=400 && mainSprite.getPositionY()>=701 && mainSprite.getPositionY()<=763 && removeClick == true){

            work_stone.removeTileAt(3,36);
            work_stone.removeTileAt(3,37);
            work_stone.removeTileAt(4,36);
            work_stone.removeTileAt(4,37);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 516 && mainSprite.getPositionX()<=579 && mainSprite.getPositionY()>=678 && mainSprite.getPositionY()<=723 && removeClick == true){

            work_stone.removeTileAt(29 ,41);
            work_stone.removeTileAt(29,42);
            work_stone.removeTileAt(30,41);
            work_stone.removeTileAt(30,42);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 646 && mainSprite.getPositionX()<=700 && mainSprite.getPositionY()>=732 && mainSprite.getPositionY()<=780 && removeClick == true){

            work_stone.removeTileAt(44,33);
            work_stone.removeTileAt(45,33);
            work_stone.removeTileAt(44,34);
            work_stone.removeTileAt(45,34);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 743 && mainSprite.getPositionX()<=800 && mainSprite.getPositionY()>=700 && mainSprite.getPositionY()<=839 && removeClick == true){

            work_stone.removeTileAt(59,25);
            work_stone.removeTileAt(60,26);
            work_stone.removeTileAt(60,25);
            work_stone.removeTileAt(59,26);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 870 && mainSprite.getPositionX()<=930 && mainSprite.getPositionY()>=860 && mainSprite.getPositionY()<=920 && removeClick == true){

            work_stone.removeTileAt(74,16);
            work_stone.removeTileAt(74,17);
            work_stone.removeTileAt(75,16);
            work_stone.removeTileAt(75,17);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 567 && mainSprite.getPositionX()<=629 && mainSprite.getPositionY()>=970 && mainSprite.getPositionY()<=1020 && removeClick == true){

            work_stone.removeTileAt(37,3);
            work_stone.removeTileAt(37,4);
            work_stone.removeTileAt(38,3);
            work_stone.removeTileAt(38,4);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 445 && mainSprite.getPositionX()<=524 && mainSprite.getPositionY()>=950 && mainSprite.getPositionY()<=1000 && removeClick == true){

            work_stone.removeTileAt(21,5);
            work_stone.removeTileAt(21,6);
            work_stone.removeTileAt(22,5);
            work_stone.removeTileAt(22,6);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 295 && mainSprite.getPositionX()<=320 && mainSprite.getPositionY()>=857 && mainSprite.getPositionY()<=908 && removeClick == true){

            work_stone.removeTileAt(1,18);
            work_stone.removeTileAt(1,19);
            work_stone.removeTileAt(2,18);
            work_stone.removeTileAt(2,19);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        if(mainSprite.getPositionX() >= 1050 && mainSprite.getPositionX()<=1100 && mainSprite.getPositionY()>=430 && mainSprite.getPositionY()<=484 && removeClick == true){

            work_stone.removeTileAt(98,74);
            work_stone.removeTileAt(98,75);
            work_stone.removeTileAt(99,74);
            work_stone.removeTileAt(99,75);
            stoneCount = stoneCount + 1;
            cc.log(stoneCount);
            removeClick = false;
        }
        removeClick = false;
        
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
    },
    endGame: function (dt) {
        
        if (flag === true ) {
            endTime++;
            flag = false; 
        }
        
        if (endTime === 9) {
            endTime = 1;
        }
        
        var x = mainSprite.getPositionX();
        var y = mainSprite.getPositionY();
        
        switch (endTime) {
            
            case 1: 
                if (x > 479 && x <= 513 && y > 950) {
                    cc.log("up 1"); 
                    gameOverFlag = true;
                }
                 if (x > 680 && x <= 720 && y > 950) {
                    cc.log("up 8");  
                    gameOverFlag = true;
                }
                break;
            case 2:
                if (x > 513 && x <= 545 && y > 950) {
                    cc.log("up 2");   
                    gameOverFlag = true;
                }
                if (x > 651 && x <= 680 && y > 950) {
                    cc.log("up 7");   
                    gameOverFlag = true;
                }
                break;
            case 3:
                if (x > 545 && x <= 573 && y > 950) {
                    cc.log("up 3");   
                    gameOverFlag = true;
                }
                if (x > 625 && x <= 651 && y > 950) {
                    cc.log("up 6");  
                    gameOverFlag = true;
                }
                break;
            case 4:
                if (x > 573 && x <= 602 && y > 950) {
                    cc.log("up 4"); 
                    gameOverFlag = true;
                }
                if (x > 602 && x <= 625 && y > 950) {
                    cc.log("up 5");   
                    gameOverFlag = true;
                }
                break;
            case 5:
                if (x > 602 && x <= 625 && y > 950) {
                    cc.log("up 5");   
                    gameOverFlag = true;
                }
                if (x > 573 && x <= 602 && y > 950) {
                    cc.log("up 4"); 
                    gameOverFlag = true;
                }
                break;
            case 6:
                if (x > 625 && x <= 651 && y > 950) {
                    cc.log("up 6");  
                    gameOverFlag = true;
                }
                 if (x > 545 && x <= 573 && y > 950) {
                    cc.log("up 3");   
                    gameOverFlag = true;
                }
                break;
            case 7:
                if (x > 651 && x <= 680 && y > 950) {
                    cc.log("up 7");   
                    gameOverFlag = true;
                }
                if (x > 513 && x <= 545 && y > 950) {
                    cc.log("up 2");   
                    gameOverFlag = true;
                }
                break;
            case 8:
                if (x > 680 && x <= 720 && y > 950) {
                    cc.log("up 8");  
                    gameOverFlag = true;
                }
                if (x > 479 && x <= 513 && y > 950) {
                    cc.log("up 1"); 
                    gameOverFlag = true;
                }
                break;
        }
        
        endTime += 1;
        
        
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
    
    var GameOver = cc.Layer.extend({
        
        ctor : function() {
            
            this._super();
            
            this.setVisible(false);
            
            var gameOverSprite = new cc.Sprite("res/gameOver.png");
            gameOverSprite.setPosition(center);
            gameOverSprite.setScale(2);
            
            this.addChild(gameOverSprite);
            
            this.scheduleUpdate();
        },
        
        update: function () {
            
            if (gameOverFlag === true) {
                
                this.setVisible(true);
                
            }
            
        }
        
    });


var Author = cc.Layer.extend({
   
    ctor : function () {
        
        this._super();
        
        this.setVisible(false);
        
        var authorSpriteBackground = new cc.Sprite("res/names.png"); 
        
        authorSpriteBackground.setAnchorPoint(0.5, 0.5);
        authorSpriteBackground.setPosition(center);
        
        this.addChild(authorSpriteBackground);
        
        this.scheduleUpdate();
        
    },
    
    update : function () {
    
        if (authorFlag === true) {
            
            this.setVisible(true);
            
        } else { 
        
            this.setVisible(false);
        }
    }
});
