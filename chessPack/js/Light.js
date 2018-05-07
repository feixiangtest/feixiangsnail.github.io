var Light = (function(_super){
    function Light(){
        Light.super(this);   
    }
    Laya.class(Light,"Light",_super);
    var _proto = Light.prototype;
    _proto.initLead = function(){
        this.light = new Laya.Sprite();
        this.light.loadImage("chess/light.png",0,0,126,196);
        this.addChild(this.light);
    }
    _proto.initOther = function(){
        this.light = new Laya.Sprite();
        this.light.loadImage("chess/light.png",0,0,111,172);
        this.addChild(this.light);
    }
    return Light
})(Laya.Sprite);