Laya.init(750,1216,Laya.WebGL);
Laya.stage.scaleMode = "showall";
Laya.stage.alignH = "center";
Laya.stage.alighW = "center";
// Laya.stage.screenMode = "vertical";
var that = this;
that.table = new Background();
Laya.stage.addChild(that.table);
//用户名(模拟)
that.username = 'Tony'
//发牌位数
that.cardType = 0;
that.cardType2 = 0;
that.cardType3 = 0;
that.readyType = 1;
that.lightNum = 11;
//投注集合
that.stakeList = [];
//玩家位置顺序
that.sequence = 1;
//高亮步数
that.lightStep = 0;
//前三张牌开牌动画状态
that.dealType = false;
that.cardList = [];
// 押注状态
that.robType = 0;
// 不押注状态
that.norobType = 0;
//websocket对象
var ws = new WebSocket("ws://10.96.84.105:8181");
ws.onopen = function (e) {
    console.log('connection!');
    ws.onmessage = function (e) {
        console.log(e.data);
        if (e.data === 'front'){
            that.sequence = 1
        } else {
            that.sequence = 2
        }
        Laya.loader.load("res/atlas/chess.atlas",Laya.Handler.create(that,loadPlayer),null,Laya.Loader.ATLAS);
        Laya.loader.load("res/atlas/cards.atlas",Laya.Handler.create(that,onLoaded),null,Laya.Loader.ATLAS);
    }
}
//牌集合
function loadPlayer(){
    // that.mutiply = new Mutiply();
    // Laya.stage.addChild(that.mutiply);
    // that.mutiply.pos(140,530);
    //主面板角色信息
    that.player = new Player();
    that.player.initLead();
    Laya.stage.addChild(that.player);
    //其他角色
    console.log(that.sequence)
    if (that.sequence === 1){
        that.player1 = new Player();
        that.player1.initOther();
        Laya.stage.addChild(that.player1);
        that.player1.pos(620,540);
    } else {
        that.player1 = new Player();
        that.player1.initOther();
        Laya.stage.addChild(that.player1);
        that.player1.pos(20,540);
    }
    //绘制角色边框
    drawLight()
    //倒计时
    that.countdown = new Countdown();
    Laya.stage.addChild(that.countdown);
    that.readyButton = new Buttontemp();
    that.readyButton.initReadyBtn();
    Laya.stage.addChild(that.readyButton);
}
function readyGame(){
    // that.readyType = 2;
    ws.send('ready');
    ws.onmessage = function (e) {
        console.log(e.data);
        if (e.data === "start"){
            that.readyType = 2;
            // console.log(111);
        }
        // initOpenCard(result);
    }
}
function onLoaded(){
    for(var i = 10; i > 0; i--) {
        that.card = new Card();
        // console.log(that.card);
        that.cardList.push(that.card);
        that.card.init();
        Laya.stage.addChild(that.card);
        that.card.pos(345,580);
    } 
    setTimeout(function(){
        Laya.timer.frameLoop(3,that,loadPlayer1);
    },100)
    if (that.sequence === 1) {
        Laya.timer.frameLoop(1.5,that,loadPlayer2);
    } else {
        Laya.timer.frameLoop(1.5,that,loadPlayer3);
    }
    // setTimeout(function(){
    //     Laya.timer.frameLoop(1,that,loadPlayer2);
    // },100)
}
function loadPlayer1(){
    // that.card = new Card();
    // that.card.init();
    // Laya.stage.addChild(that.card);
    // that.card.x -= 1;
    // console.log(111)
    //发牌动画
    if (that.readyType === 2){
        console.log(111)
        if (that.cardType === 0){
            var move1 = that.cardList[0];
            move1.y += 65;
            move1.x -= 50;
            if (move1.y === 840){
                that.cardType += 1;
                Laya.timer.clear(that,loadPlayer1);
                Laya.timer.frameLoop(3,that,loadPlayer1);
            }
        } else if (that.cardType === 1){
            var move2 = that.cardList[1];
            move2.y += 65;
            move2.x -= 25;
            if (move2.y === 840){
                that.cardType += 1;
                Laya.timer.clear(that,loadPlayer1);
                Laya.timer.frameLoop(3,that,loadPlayer1);
            }
        } else if (that.cardType === 2){
            var move3 = that.cardList[2];
            move3.y += 65;
            if (move3.y === 840){
                that.cardType += 1;
                Laya.timer.clear(that,loadPlayer1);
                Laya.timer.frameLoop(3,that,loadPlayer1);
            }
        } else if (that.cardType === 3){
            var move4 = that.cardList[3];
            move4.y += 65;
            move4.x += 25;  
            if (move4.y === 840){
                that.cardType += 1;
                Laya.timer.clear(that,loadPlayer1);
                Laya.timer.frameLoop(3,that,loadPlayer1);
            }
        } else if (that.cardType === 4){
            var move5 = that.cardList[4];
            move5.y += 65;
            move5.x += 50;   
            if (move5.y === 840){
                // that.cardType += 5;
                Laya.timer.clear(that,loadPlayer1);
                that.dealType = true;
                // Laya.timer.frameLoop(3,that,onLoop);
            }
        }
    }
    if (that.dealType) {
        showRobButton()
        setTimeout(function(){
            openWebsocket()
        },300)   
        that.countdownText = new Laya.Text();
        that.countdownNum = 8;
        that.countdownText.color = "#ffffff";
        that.countdownText.fontSize = 28;
        that.countdownText.x = "367";
        that.countdownText.y = "575";
        that.countdownText.text = that.countdownNum;
        Laya.stage.addChild(that.countdownText);
        that.timer = setInterval(function(){
            that.countdownNum -= 1;
            that.countdownText.text = that.countdownNum;
            if (that.countdownNum === 0){
                if (that.robType === 0) {
                    norob();
                }
                clearInt()
                // lightAction();
                //倒计时结束，默认不上庄
                console.log(111) 
            }
        },1000)   
    }
}
//清除定时器并隐藏按钮
function clearInt(){
    clearInterval(that.timer);
    that.countdown.visible = false;
    that.countdownText.visible = false;
    that.countdownNum = 8;
}

//玩家2发牌动画
function loadPlayer2(){
    if (that.readyType === 2){
        if (that.cardType2 === 0){
            var move6 = that.cardList[5];
            move6.x += 25;   
            console.log(move6.x)
            if (move6.x === 545){
                that.cardType2 += 1;
                Laya.timer.clear(that,loadPlayer2);
                Laya.timer.frameLoop(1.5,that,loadPlayer2);
            }
        } 
        else if (that.cardType2 === 1){
            var move7 = that.cardList[6];
            move7.x += 20;
            if (move7.x === 525){
                that.cardType2 += 1;
                Laya.timer.clear(that,loadPlayer2);
                Laya.timer.frameLoop(1.5,that,loadPlayer2);
            }
        } else if (that.cardType2 === 2){
            var move8 = that.cardList[7];
            move8.x += 20;
            if (move8.x === 505){
                that.cardType2 += 1;
                Laya.timer.clear(that,loadPlayer2);
                Laya.timer.frameLoop(1.5,that,loadPlayer2);
            }
        } else if (that.cardType2 === 3){
            var move9 = that.cardList[8];
            move9.x += 20;
            if (move9.x === 485){
                that.cardType2 += 1;
                Laya.timer.clear(that,loadPlayer2);
                Laya.timer.frameLoop(1.5,that,loadPlayer2);
            }
        } else if (that.cardType2 === 4){
            var move10 = that.cardList[9];
            move10.x += 20;
            if (move10.x === 465){
                // that.cardType = 100;
                Laya.timer.clear(that,loadPlayer2);
                // Laya.timer.frameLoop(1,that,onLoop);
            }
        }
    }
}
//玩家3发牌动画
function loadPlayer3(){
    if (that.readyType === 2){
        if (that.cardType3 === 0){
            var move6 = that.cardList[5];
            move6.x -= 25;   
            console.log(move6.x)
            if (move6.x === 145){
                that.cardType3 += 1;
                Laya.timer.clear(that,loadPlayer3);
                Laya.timer.frameLoop(1.5,that,loadPlayer3);
            }
        } 
        else if (that.cardType3 === 1){
            var move7 = that.cardList[6];
            move7.x -= 20;
            if (move7.x === 165){
                that.cardType3 += 1;
                Laya.timer.clear(that,loadPlayer3);
                Laya.timer.frameLoop(1.5,that,loadPlayer3);
            }
        } else if (that.cardType3 === 2){
            var move8 = that.cardList[7];
            move8.x -= 20;
            if (move8.x === 185){
                that.cardType3 += 1;
                Laya.timer.clear(that,loadPlayer3);
                Laya.timer.frameLoop(1.5,that,loadPlayer3);
            }
        } else if (that.cardType3 === 3){
            var move9 = that.cardList[8];
            move9.x -= 20;
            if (move9.x === 205){
                that.cardType3 += 1;
                Laya.timer.clear(that,loadPlayer3);
                Laya.timer.frameLoop(1.5,that,loadPlayer3);
            }
        } else if (that.cardType3 === 4){
            var move10 = that.cardList[9];
            move10.x -= 20;
            if (move10.x === 225){
                // that.cardType = 100;
                Laya.timer.clear(that,loadPlayer3);
                // Laya.timer.frameLoop(1,that,onLoop);
            }
        }
    }
}
//上庄下庄按钮
function showRobButton(){
    that.robButton = new Buttontemp();
    that.robButton.initRob();
    Laya.stage.addChild(that.robButton);
    that.norobButton = new Buttontemp();
    that.norobButton.initNorob();
    Laya.stage.addChild(that.norobButton);
}
function openWebsocket(){
    ws.send('draw');
    ws.onmessage = function (e) {
        var result = JSON.parse(e.data);
        // console.log(e.data);
        initOpenCard(result);
    }
}
//前三张牌翻牌动画
function initOpenCard(arr){
    that.cardList[0].visible = false;
    that.cardList[1].visible = false;
    that.cardList[2].visible = false;
    that.cardAction1 = new Card();
    that.cardAction1.initAnimation(arr[0],145,840);
    that.cardAction1.pos(145,830);
    Laya.stage.addChild(that.cardAction1);
    that.cardAction2 = new Card();
    that.cardAction2.initAnimation(arr[1],245,840);
    that.cardAction2.pos(245,830);
    Laya.stage.addChild(that.cardAction2);
    that.cardAction3 = new Card();
    that.cardAction3.initAnimation(arr[2],345,840);
    that.cardAction3.pos(345,830);
    Laya.stage.addChild(that.cardAction3);
}
//角色框高亮效果
function drawLight(){
    that.light = new Light();
    that.light.initLead();
    Laya.stage.addChild(that.light);
    that.light.pos(315,950);
    that.light.visible = false;
    that.light1 = new Light();
    that.light1.initOther();
    Laya.stage.addChild(that.light1);
    that.light1.pos(620,540);
    that.light1.visible = false;
    that.light2 = new Light();
    that.light2.initOther();
    Laya.stage.addChild(that.light2);
    that.light2.pos(20,540);
    that.light2.visible = false;
}
//高亮动画
function lightAction(){
    that.countdown.visible = false;
    that.countdownText.visible = false;
    that.robButton.removeSelf();
    that.norobButton.removeSelf();
    clearInterval(that.timer);
    that.lightTimer = setInterval(function(){
        that.lightStep += 1;
        if (that.lightStep % 2 === 1) {
            that.light.visible = true;
            if (that.sequence === 1) {
                that.light1.visible = false;
            } else {
                that.light2.visible = false;
            }       
        } else {
            if (that.sequence === 1) {
                that.light1.visible = true;
            } else {
                that.light2.visible = true;
            }           
            that.light.visible = false;
        }
        console.log(that.lightStep)
        console.log(that.lightNum)
        if (that.lightStep === Number(that.lightNum)){
            clearInterval(that.lightTimer);
            //显示押注倍率和押注倒计时
            that.countdownNum = 8;
            that.countdownText.text = that.countdownNum;
            that.countdown.visible = true;
            that.countdownText.visible = true;
            that.timer = setInterval(function(){
                that.countdownNum -= 1;
                that.countdownText.text = that.countdownNum;
                if (that.countdownNum === 0){
                    clearInt()
                    // lightAction();
                }
            },1000)
            if (that.lightNum === '12'){
                // console.log(111)
                stakeMultiple()
            } else {
                //等待闲家下注
                idleHome();
                //倒计时
            }
        }
    },150)
}
//抢庄
function rob(){
    that.robButton.removeSelf();
    that.norobButton.removeSelf();
    that.robType = 1;
    var sendMsg = {
        name: that.username,
        msg: 'rob'
    }
    ws.send(JSON.stringify(sendMsg));
    ws.onmessage = function (e) {
        console.log(e.data)
        // clearInt()
        if (e.data === '11' || e.data === '12'){
            that.lightNum = e.data;
            lightAction();
        } else if (e.data === that.username) {
            that.light.visible = true;
            idleHome();
            // clearInterval(that.timer);
        } else {
            stakeMultiple()
            // clearInterval(that.timer);
            if (that.sequence === 1) {
                that.light1.visible = true;
            } else {
                that.light2.visible = true;
            }
        }
    }
}
//不抢庄
function norob(){
    that.robButton.removeSelf();
    that.norobButton.removeSelf();
    that.robType = 1;
    var sendMsg = {
        name: that.username,
        msg: 'norob'
    }
    ws.send(JSON.stringify(sendMsg));
    ws.onmessage = function (e) {
        console.log(e.data)
        // clearInt()
        if (e.data === '11' || e.data === '12'){
            that.lightNum = e.data;
            lightAction();
        } else if (e.data === that.username) {
            that.light.visible = true;
            idleHome();
        } else {
            stakeMultiple()
            if (that.sequence === 1) {
                that.light1.visible = true;
            } else {
                that.light2.visible = true;
            }
        }
    }
}
//押注倍率
function stakeMultiple(){
    for (var i = 0; i< 4; i++) {
        that.stake = new Stake()
        that.stakeList.push(that.stake);
        // stake.init(1);
        // stake.pos(170,760);
        Laya.stage.addChild(that.stake);
    }
    that.stakeList[0].init(1)
    that.stakeList[0].pos(145,760);
    that.stakeList[1].init(2)
    that.stakeList[1].pos(265,760);
    that.stakeList[2].init(4)
    that.stakeList[2].pos(385,760);
    that.stakeList[3].init(5)
    that.stakeList[3].pos(505,760);
}
//等待闲家下注
function idleHome(){
    that.idleText = new Laya.Text();
    that.idleText.color = "#ffffff";
    that.idleText.fontSize = 22;
    // that.idleText.spacing[0] = [4,4];
    that.idleText.x = "310";
    that.idleText.y = "800";
    // that.idleText.stroke = 5;
    // that.idleText.padding[1] = 8;
    that.idleText.text = '等待闲家下注';
    Laya.stage.addChild(idleText);
    // nopour();
}
//下注
function pour(num){
    console.log(num)
    var sendMsg = {
        name: that.username,
        number: num,
        type: 'rob'
    }
    ws.send(JSON.stringify(sendMsg))
    ws.onmessage = function (e) {
        console.log(e.data)
        var obj = JSON.parse(e.data)
        if (obj.name === that.username) {
            createMutiply(obj.number);
            that.mutiply.pos(440,970);
        } else {
            if (that.sequence === 1) {
                createMutiply(obj.number);
                that.mutiply.pos(580,530)
            } else {
                createMutiply(obj.number);
                that.mutiply.pos(140,530)
            }
        }
        //清除下注按钮
        that.stakeList.forEach(function(res){
            res.removeSelf();
        })
        // 清除下注定时器
        clearInt()
    }
}
// 不下注
function nopour(){
    var sendMsg = {
        type: 'rob'
    }
    ws.send(JSON.stringify(sendMsg))
    ws.onmessage = function (e) {
        console.log(e.data)
        var obj = JSON.parse(e.data)
        if (obj.name === that.username) {
            createMutiply(obj.number);
            that.mutiply.pos(440,970);
        } else {
            if (that.sequence === 1) {
                createMutiply(obj.number);
                that.mutiply.pos(580,530)
            } else {
                createMutiply(obj.number);
                that.mutiply.pos(140,530)
            }
        }
        // 清除隐藏下注定时器
        clearInt()
    }
}
function createMutiply(num){
    that.mutiply = new Mutiply();
    that.mutiply.init(num)
    Laya.stage.addChild(that.mutiply);
}