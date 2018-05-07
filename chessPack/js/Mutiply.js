var Mutiply = (function(_super){
    function Mutiply(){
        Mutiply.super(this);
    }
    Laya.class(Mutiply,"Mutiply",_super);
    var _proto = Mutiply.prototype;
    _proto.init = function(_srcNum){
        this.srcNum = _srcNum;
        this.mutiply = new Laya.Sprite();
        this.mutiply.loadImage("chess/X-"+this.srcNum+".png",0,0,34,34);
        this.addChild(this.mutiply);
    }
    return Mutiply
})(Laya.Sprite);