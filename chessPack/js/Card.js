var Card = (function(_super){
    function Card(){
        Card.super(this);       
    }
    Laya.class(Card,"Card",_super);
    var _proto = Card.prototype;
    _proto.init = function(){
        // this.srcNum = _srcNum;
        this.card = new Laya.Sprite();
        this.card.loadImage("cards/backcard.png",0,0,64.5,96);
        this.addChild(this.card);
        // this.card.pos(340,540)
    }
    _proto.initAnimation = function(_num,_x,_y){
        this.num = _num;
        this.x = _x;
        this.y = _y;
        Laya.Animation.createFrames(["cards/animation_2.png","cards/animation_3.png","cards/animation_4.png","cards/animation_5.png","cards/animation_6.png","cards/animation_7.png"],"card");
        this.body = new Laya.Animation();
        this.body.interval = 30;
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE,this,this.onPlayComplete);
        this.playAction("card")
    }
    _proto.onPlayComplete = function(){
        console.log(111);
        this.body.removeSelf();
        this.changeImg(this.num);
    }
    _proto.playAction = function(action){
        this.body.play(0,false,action)
        // this.body.pos(Number(this.x),Number(this.y))
    }
    _proto.changeImg = function(num){
        this.card = new Laya.Sprite();
        this.card.loadImage("cards/"+num+".png",0,0,64.5,96);
        this.addChild(this.card);
        this.pos(Number(this.x),Number(this.y) + 10)
    }
    return Card
})(Laya.Sprite);