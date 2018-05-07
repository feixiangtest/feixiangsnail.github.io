var Player = (function(_super){
    function Player(){
        Player.super(this);   
         
    }
    Laya.class(Player,"Player",_super);
    var _proto = Player.prototype;
    // _proto.init = function(){
        // this.srcNum = _srcNum;

        // this.player.loadImage("chess/player.png");
        // this.addChild(this.player);
        // this.player.pos(480,540)
    // }
    _proto.initLead = function(){
        this.player = new Laya.Sprite();
        this.player.loadImage("chess/player.png",0,0,126,196);
        this.addChild(this.player);
        this.player.pos(315,950)
    }
    _proto.initOther = function(){
        this.player = new Laya.Sprite();
        this.player.loadImage("chess/player.png",0,0,111,172);
        this.addChild(this.player);
    }
    return Player
})(Laya.Sprite);