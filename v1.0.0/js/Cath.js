var Cath = (function(_super){
    function Cath(){
        Cath.super(this);
    }
    Laya.class(Cath,"Cath",_super);
    var _proto = Cath.prototype;
    _proto.init = function(_srcNum){
        this.srcNum = _srcNum;
        this.cath = new Laya.Sprite();
        this.loadImage();
        this.addChild(this.cath);
        this.cath.on(Laya.Event.CLICK,this,function(){
            cath(this.srcNum)
        })
    }
    _proto.loadImage = function(){
        this.cath.loadImage("fruit/cath_"+this.srcNum+".png");
    }
    _proto.cathFruit = function(){
        this.kingNum += 1;
        this.cath.loadImage("fruit/cathcheck_"+this.srcNum+".png");
    }
    return Cath
})(Laya.Sprite);