var Countdown = (function(_super){
    function Countdown(){
        Countdown.super(this);   
        this.countdown = new Laya.Sprite();
        this.countdown.loadImage("chess/bull_clock.png");
        this.addChild(this.countdown);
        this.countdown.pos(345,560)  
    }
    Laya.class(Countdown,"Countdown",_super);
    return Countdown
})(Laya.Sprite);