var Center = (function(_super){
    function Center(){
        Center.super(this);
        this.ctImg = new Laya.Sprite();
        this.ctImg.loadImage("fruit/center.png");
        this.ctImg.pos(180,200);
        this.addChild(this.ctImg);
        Laya.Animation.createFrames(["fruit/light1.png","fruit/light2.png"],"light");
        this.light1 = new Laya.Animation();
        this.light1.interval = 500;
        this.light1.play(0,true,"light");
        this.light1.pos(16,75);
        this.addChild(this.light1);
        this.light2 = new Laya.Animation();
        this.light2.interval = 500;
        this.light2.play(0,true,"light");
        this.light2.pos(672,75);
        this.addChild(this.light2);
        this.showMoney = new Laya.Sprite();
        this.showMoney.loadImage("fruit/show_money.png");
        this.showMoney.pos(24,14);
        this.addChild(this.showMoney);
        this.moneyLogo = new Laya.Sprite();
        this.moneyLogo.loadImage("fruit/money_logo.png");
        this.moneyLogo.pos(20,8);
        this.addChild(this.moneyLogo);
        this.addMoney = new Laya.Sprite();
        this.addMoney.loadImage("fruit/add_money.png");
        this.addMoney.pos(340,15);
        this.addChild(this.addMoney);
    }
    Laya.class(Center,"Center",_super);
    return Center
})(Laya.Sprite);