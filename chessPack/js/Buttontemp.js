var Buttontemp = (function(_super){
    function Buttontemp(){
        Buttontemp.super(this);     
    }
    Laya.class(Buttontemp,"Buttontemp",_super);
    var _proto = Buttontemp.prototype;
    _proto.initReadyBtn = function(){
        this.readyButton = new Laya.Sprite();
        this.readyButton.loadImage("chess/readyButton.png",0,0,178,58);
        this.addChild(this.readyButton);
        this.readyButton.pos(290,880);
        this.readyButton.on(Laya.Event.CLICK,this,function(){
            readyGame();
            this.readyButton.removeSelf();
        })
    }
    _proto.initRob = function(){
        this.robButton = new Laya.Sprite();
        this.robButton.loadImage("chess/rob.png",0,0,138,54);
        this.addChild(this.robButton);
        this.robButton.pos(220,760);
        this.robButton.on(Laya.Event.CLICK,this,function(){
            // lightAction()
            rob();
        })
    }
    _proto.initNorob = function(){
        this.norobButton = new Laya.Sprite();
        this.norobButton.loadImage("chess/norob.png",0,0,138,54);
        this.addChild(this.norobButton);
        this.norobButton.pos(390,760);
        this.norobButton.on(Laya.Event.CLICK,this,function(){
            norob();
        })
    }
    return Buttontemp
})(Laya.Sprite);