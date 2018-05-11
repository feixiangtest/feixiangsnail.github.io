var StartBtn = (function(_super){
    function StartBtn(){
        StartBtn.super(this);
        this.startBtn = new Laya.Sprite();
        this.addChild(this.startBtn);
        this.startBtn.on(Laya.Event.CLICK,this,function(){
            startGame()
        })
    }
    Laya.class(StartBtn,"start",_super);
    var _proto = StartBtn.prototype;
    _proto.stopGame = function(){
        this.startBtn.loadImage("fruit/start.png");
        this.startBtn.pos(60,830);
    }
    _proto.playGame = function(){
        this.startBtn.loadImage("fruit/start2.png");
        this.startBtn.pos(60,834);
    }
    return StartBtn
})(Laya.Sprite);