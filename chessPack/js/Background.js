var Background = (function(_super){
    function Background(){
        Background.super(this);
        this.background = new Laya.Sprite();
        this.background.loadImage("chess/table.jpg");
        this.addChild(this.background);
    }
    Laya.class(Background,"Background",_super);
    return Background
})(Laya.Sprite);