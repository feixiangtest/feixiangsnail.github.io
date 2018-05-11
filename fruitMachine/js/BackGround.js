var BackGround = (function(_super){
    function BackGround(){
        BackGround.super(this);
        this.bg = new Laya.Sprite();
        this.bg.loadImage("fruit/gameBG.jpg");
        this.addChild(this.bg) 
    }
    Laya.class(BackGround,"BackGround",_super);
    return BackGround
    function onSpClick(){
        console.log(111)
    }
})(Laya.Sprite);