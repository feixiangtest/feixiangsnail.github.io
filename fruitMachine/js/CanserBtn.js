var CanserBtn = (function(_super){
    function CanserBtn(){
        CanserBtn.super(this);
        this.canserBtn = new Laya.Sprite();
        this.addChild(this.canserBtn);
        this.canserBtn.on(Laya.Event.CLICK,this,function(){
            canserCath();
        })
    }
    Laya.class(CanserBtn,"canser",_super);
    var _proto = CanserBtn.prototype;
    _proto.load = function(){
        this.canserBtn.loadImage("fruit/canser.png");
        this.canserBtn.pos(510,828);

    }
    _proto.canser = function(){
        this.canserBtn.loadImage("fruit/canser1.png");
        this.canserBtn.pos(510,832);
    }
    return CanserBtn
})(Laya.Sprite);