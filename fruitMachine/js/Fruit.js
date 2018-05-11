var Fruit = (function(_super){
    function Fruit(){
        Fruit.super(this);      
    }
    Laya.class(Fruit,"Fruit",_super);
    var _proto = Fruit.prototype;
    _proto.init = function(_srcNum,_fruitNum){
        //图片号码
        this.srcNum = _srcNum;
        //水果号码
        this.fruitNum = _fruitNum;
        //选中状态
        this.checked = false;
        this.fruit = new Laya.Sprite();
        this.loadImage();
        this.addChild(this.fruit)
    }
    _proto.loadImage = function(){
        // this.num = num
        this.fruit.loadImage("fruit/fruit_"+this.srcNum+".png",0,0,80,80);
    }
    _proto.changeImage = function(){
        this.fruit.loadImage("fruit/fruitchecked_"+this.srcNum+".png",0,0,80,80);
    }
    return Fruit
})(Laya.Sprite);