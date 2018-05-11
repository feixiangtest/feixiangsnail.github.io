var Operate = (function(_super){
    function Operate(){
        Operate.super(this);
        this.operate = new Laya.Sprite();
        this.operate.loadImage("fruit/operate.png");
        this.operate.pos(5,970);
        this.addChild(this.operate);
        this.transverse = new Laya.Sprite();
        this.transverse.loadImage("fruit/transverse_line.png");
        this.transverse.pos(80,1040);
        this.addChild(this.transverse);
        // createVertical();
        for(var i = 0;i < 7;i ++){
            this.vertical = new Laya.Sprite();
            this.vertical.loadImage("fruit/vertical_line.png");
            this.vertical.pos(106 + i * 90,990);
            this.addChild(this.vertical);
        }
    }
    Laya.class(Operate,"Operate",_super);
    return Operate
})(Laya.Sprite);