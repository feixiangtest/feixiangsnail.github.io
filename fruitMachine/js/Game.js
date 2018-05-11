    Laya.init(750,1240,Laya.WebGL);
    Laya.stage.scaleMode = "showall";
    Laya.stage.alignH = "center";
    Laya.stage.bgColor = "#361b0a"
    //游戏背景
    this.bg = new BackGround();
    Laya.stage.addChild(this.bg);
    Laya.loader.load("res/atlas/fruit.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS)
    //选中的水果号码
    this.checkedNum = 0;
    //当前转动步数
    this.stepNum = 0;
    //水果转动速度
    this.actionNum = 2;
    //游戏总步数
    this.stepAll = 0;
    //中奖号码
    this.awartNum = 0;
    //游戏状态
    this.btnType = 2;
    //投注数
    this.kingCath = 0;
    this.kingNum = new Laya.Text();
    this.sevenCath = 0;
    this.sevenNum = new Laya.Text();
    this.bellCath = 0;
    this.bellNum = new Laya.Text();
    this.orangeCath = 0;
    this.orangeNum = new Laya.Text();
    this.cherryCath = 0;
    this.cherryNum = new Laya.Text();
    this.grapeCath = 0;
    this.grapeNum = new Laya.Text();
    this.watermelonCath = 0;
    this.watermelonNum = new Laya.Text();
    this.appleCath = 0;
    this.appleNum = new Laya.Text();
    //余额
    this.balance = new Laya.Text();
    this.balcanceNum = 99999;
    function onLoaded(){
        //生成水果
        this.fruit1 = new Fruit();
        createFruit(this.fruit1,75,90,9,1);
        fruit1.changeImage(this.srcNum,this.fruitNum);
        this.fruit2 = new Fruit();
        createFruit(this.fruit2,160,90,9,2);
        this.fruit3 = new Fruit();
        createFruit(this.fruit3,245,90,6,3);
        this.fruit4 = new Fruit();
        createFruit(this.fruit4,330,90,6,4);
        this.fruit5 = new Fruit();
        createFruit(this.fruit5,415,90,10,5);
        this.fruit6 = new Fruit();
        createFruit(this.fruit6,500,90,10,6);
        this.fruit7 = new Fruit();
        createFruit(this.fruit7,585,90,8,7);
        this.fruit8 = new Fruit();
        createFruit(this.fruit8,75,175,7,24);
        this.fruit9 = new Fruit();
        createFruit(this.fruit9,585,175,6,8);
        this.fruit10 = new Fruit();
        createFruit(this.fruit10,75,260,7,23);
        this.fruit11 = new Fruit();
        createFruit(this.fruit11,585,260,7,9);
        this.fruit12 = new Fruit();
        createFruit(this.fruit12,75,345,5,22);
        this.fruit13 = new Fruit();
        createFruit(this.fruit13,585,345,4,10);
        this.fruit14 = new Fruit();
        createFruit(this.fruit14,75,430,1,21);
        this.fruit15 = new Fruit();
        createFruit(this.fruit15,585,430,2,11);
        this.fruit16 = new Fruit();
        createFruit(this.fruit16,75,515,9,20);
        this.fruit17 = new Fruit();
        createFruit(this.fruit17,585,515,7,12);
        this.fruit18 = new Fruit();
        createFruit(this.fruit18,75,600,10,19);
        this.fruit19 = new Fruit();
        createFruit(this.fruit19,160,600,2,18);
        this.fruit20 = new Fruit();
        createFruit(this.fruit20,245,600,2,17);
        this.fruit21 = new Fruit();
        createFruit(this.fruit21,330,600,8,16);
        this.fruit22 = new Fruit();
        createFruit(this.fruit22,415,600,8,15);
        this.fruit23 = new Fruit();
        createFruit(this.fruit23,500,600,1,14);
        this.fruit24 = new Fruit();
        createFruit(this.fruit24,585,600,1,13);
        // Laya.timer.frameLoop(this.actionNum,this,onLoop);
        //中间图，包含开奖状态
        this.ct = new Center();
        Laya.stage.addChild(this.ct);  
        //开始按钮
        this.startBtn = new StartBtn();
        Laya.stage.addChild(this.startBtn);
        this.startBtn.stopGame();
        //撤销按钮
        this.canserBtn = new CanserBtn();
        Laya.stage.addChild(this.canserBtn);
        this.canserBtn.load();
        operate();
        createCath();
        showBalance();
        //投注图片初始化
        cathNum(this.kingNum,56,996);
        cathNum(this.sevenNum,146,996);
        cathNum(this.bellNum,236,996);
        cathNum(this.orangeNum,326,996);
        cathNum(this.cherryNum,416,996);
        cathNum(this.grapeNum,506,996);
        cathNum(this.watermelonNum,596,996);
        cathNum(this.appleNum,686,996);
    }
    //余额初始化
    function showBalance(){
        this.balance.color = "#ffffff";
        this.balance.fontSize = 28;
        this.balance.x = "170";
        this.balance.y = "24";
        Laya.stage.addChild(this.balance)
		this.balance.text = this.balcanceNum;
    }
    //投注时余额发生变化
    function minusBalance(){
        this.balcanceNum -= 1;
        this.balance.text = this.balcanceNum;
    }
    //初始化投注号码
    function cathNum(obj,x,y){
        obj.color = "#ffffff";
        obj.fontSize = 28;
        obj.x = x;
        obj.y = y;
        Laya.stage.addChild(obj);
		obj.text = 0;
    }
    function startGame(){
        if (this.btnType === 2){
            //随机生成中奖号码
            var num = Math.floor(Math.random()*24) + 1;
            this.awartNum = num;
            console.log(num);
            //根据中奖号码生成总步数
            this.stepAll = this.awartNum + 72 - this.checkedNum;
            //开始按钮按下弹起效果
            this.startBtn.removeSelf();
            this.startBtn = new StartBtn();
            Laya.stage.addChild(this.startBtn); 
            this.startBtn.playGame();
            Laya.timer.frameOnce(10,this,stopStart);
            //定时器启动转动
            Laya.timer.frameLoop(this.actionNum,this,onLoop);
            //设置游戏状态为进行中
            this.btnType = 1;
        }
    }
    //投注
    function cath(num){
        if (this.btnType === 2){
            if (num === 3){
                this.king.cathFruit();
                this.kingCath += 1;
                this.kingNum.text = this.kingCath;
            } else if (num === 8){
                this.seven.cathFruit();
                this.sevenCath += 1;
                this.sevenNum.text = this.sevenCath;
            } else if (num === 9){
                this.bell.cathFruit();
                this.bellCath += 1;
                this.bellNum.text = this.bellCath;
            } else if (num === 1){
                this.orange.cathFruit();
                this.orangeCath += 1;
                this.orangeNum.text = this.orangeCath;
            } else if (num === 2){
                this.cherry.cathFruit();
                this.cherryCath += 1;
                this.cherryNum.text = this.cherryCath;
            } else if (num === 6){
                this.grape.cathFruit();
                this.grapeCath += 1;
                this.grapeNum.text = this.grapeCath;
            } else if (num === 7){
                this.watermelon.cathFruit();
                this.watermelonCath += 1;
                this.watermelonNum.text = this.watermelonCath;
            } else if (num === 10){
                this.apple.cathFruit();
                this.appleCath += 1;
                this.appleNum.text = this.appleCath;
            }
            minusBalance();
        }  
    }
    function stopStart(){
        this.startBtn.removeSelf();
        this.startBtn = new StartBtn();
        Laya.stage.addChild(this.startBtn);
        this.startBtn.stopGame()
    }
    //初始化投注图
    function createCath(){
        this.king = new Cath();
        this.king.init(3);
        this.king.pos(18,1050);       
        Laya.stage.addChild(this.king);
        this.seven = new Cath();
        this.seven.init(8);
        this.seven.pos(108,1050);
        Laya.stage.addChild(this.seven);
        this.bell = new Cath();
        this.bell.init(9);
        this.bell.pos(198,1050);
        Laya.stage.addChild(this.bell);
        this.orange = new Cath();
        this.orange.init(1);
        this.orange.pos(288,1050);
        Laya.stage.addChild(this.orange);
        this.cherry = new Cath();
        this.cherry.init(2);
        this.cherry.pos(378,1050);
        Laya.stage.addChild(this.cherry);
        this.grape = new Cath();
        this.grape.init(6);
        this.grape.pos(468,1050);
        Laya.stage.addChild(this.grape);
        this.watermelon = new Cath();
        this.watermelon.init(7);
        this.watermelon.pos(558,1050);
        Laya.stage.addChild(this.watermelon);
        this.apple = new Cath();
        this.apple.init(10);
        this.apple.pos(648,1050);
        Laya.stage.addChild(this.apple);
    }
    //撤销投注
    function canserCath(){
        if (this.btnType === 2){
            this.canserBtn.removeSelf()
            this.canserBtn = new CanserBtn();
            Laya.stage.addChild(this.canserBtn);
            this.canserBtn.canser();
            Laya.timer.frameOnce(15,this,recanser);
            this.king.loadImage();
            this.seven.loadImage();
            this.bell.loadImage();
            this.orange.loadImage();
            this.cherry.loadImage();
            this.grape.loadImage();
            this.watermelon.loadImage();
            this.apple.loadImage();
            this.balcanceNum += this.kingCath + this.sevenCath + this.bellCath + this.orangeCath +
                                this.cherryCath + this.grapeCath + this.watermelonCath + this.appleCath
            this.balance.text = this.balcanceNum
            // 初始化投注数
            this.kingCath = 0;
            this.sevenCath = 0;
            this.bellCath = 0;
            this.orangeCath = 0;
            this.cherryCath = 0;
            this.grapeCath = 0;
            this.watermelonCath = 0;
            this.appleCath = 0;
            this.kingNum.text = this.kingCath;
            this.sevenNum.text = this.sevenCath;
            this.bellNum.text = this.bellCath;
            this.orangeNum.text = this.orangeCath;
            this.cherryNum.text = this.cherryCath;
            this.grapeNum.text = this.grapeCath;
            this.watermelonNum.text = this.watermelonCath;
            this.appleNum.text = this.appleCath;
        }
    }
    function recanser(){
        this.canserBtn.removeSelf()
        this.canserBtn = new CanserBtn();
        Laya.stage.addChild(this.canserBtn);
        this.canserBtn.load();
    }
    //投注操作板
    function operate(){
        this.operate = new Operate();
        Laya.stage.addChild(this.operate);
    }
    function initCath(){
        this.king.loadImage();
        this.seven.loadImage();
        this.bell.loadImage();
        this.orange.loadImage();
        this.cherry.loadImage();
        this.grape.loadImage();
        this.watermelon.loadImage();
        this.apple.loadImage();
    }
    function onLoop(){
        this.checkedNum += 1;
        this.stepNum += 1;
        if (this.checkedNum > 24){
            this.checkedNum = 1
        }
        //遍历所有水果
        for(var i = Laya.stage.numChildren-3;i>0;i--){
            var fruit = Laya.stage.getChildAt(i);
            if(fruit.fruitNum === this.checkedNum){
                // console.log(fruit);
                fruit.checked = true
                fruit.changeImage(this.srcNum,this.fruitNum);
            }else{
                fruit.checked = false
                // fruit.loadImage(this.srcNum,this.fruitNum);
            }
            if(fruit.fruitNum === this.checkedNum - 1){
                fruit.loadImage(this.srcNum,this.fruitNum);
            }
            if(this.checkedNum === 1){
                if(fruit.fruitNum === 24){
                   fruit.loadImage(this.srcNum,this.fruitNum); 
                }
            }
            if(this.stepNum === this.stepAll){
                Laya.timer.clear(this,onLoop);
                // initCath();
                this.btnType = 2;
                this.actionNum = 2;
                this.stepNum = 0;
            }
            if(this.stepAll - this.stepNum === 20){
                this.actionNum = 4
                Laya.timer.clear(this,onLoop);
                Laya.timer.frameLoop(this.actionNum,this,onLoop);
            }
            if(this.stepAll - this.stepNum === 15){
                this.actionNum = 5
                Laya.timer.clear(this,onLoop);
                Laya.timer.frameLoop(this.actionNum,this,onLoop);
            }
            if(this.stepAll - this.stepNum === 10){
                this.actionNum = 8
                Laya.timer.clear(this,onLoop);
                Laya.timer.frameLoop(this.actionNum,this,onLoop);
            }
            if(this.stepAll - this.stepNum === 5){
                this.actionNum = 10
                Laya.timer.clear(this,onLoop);
                Laya.timer.frameLoop(this.actionNum,this,onLoop);
            }
            if(this.stepAll - this.stepNum === 2){
                this.actionNum = 25
                Laya.timer.clear(this,onLoop);
                Laya.timer.frameLoop(this.actionNum,this,onLoop);
            }
        }
    }
    function createFruit(obj,x,y,imgNum,fruitNum){
        obj.init(imgNum,fruitNum);
        obj.pos(x,y);
        Laya.stage.addChild(obj);
    }