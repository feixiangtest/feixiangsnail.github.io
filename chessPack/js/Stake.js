var Stake = (function(_super){
    function Stake(){
        Stake.super(this);   
    }
    Laya.class(Stake,"Stake",_super);
    var _proto = Stake.prototype;
    _proto.init = function(_srcNum){
        this.srcNum = _srcNum;
        this.stake = new Laya.Sprite();
        this.loadImage();
        this.addChild(this.stake);
        this.stake.on(Laya.Event.CLICK,this,function(){
            pour(this.srcNum);
        })
    }
    _proto.loadImage = function(){
        this.stake.loadImage("chess/multiple"+this.srcNum+".png",0,0,103,52)
    }
    return Stake
})(Laya.Sprite);