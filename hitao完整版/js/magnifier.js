function magnifier(opt) {
    this.box = document.getElementsByClassName(opt.class)[0]
    this.scal = opt.scal;
    this.boxWidth = opt.boxWidth;
    this.boxHeight = opt.boxHeight;
    this.ballBg = opt.ballBg;
    this.url = opt.url;
    this.ball = opt.ball;
    this.bigImg = opt.bigImg;
    this.init();
    this.DOMready();
    this.DOMbind();
}
magnifier.prototype = {
    init: function () {
        this.box.style.cssText = 'position:relative;width:' + this.boxWidth + 'px;height:' + this.boxHeight + 'px;'
        this.leftBox = document.createElement('div');
        this.leftBox.style.cssText = 'position:absolute;width:' + this.boxWidth + 'px;height:' + this.boxHeight + 'px;left:0;top:0;'
        this.rightBox = document.createElement('div');
        this.rightBox.style.cssText = 'position:absolute;width:' + this.boxWidth + 'px;height:' + this.boxHeight + 'px;overflow:hidden;display:none;left:' + (this.boxWidth + 50) + 'px;top:0;'
        this.box.appendChild(this.leftBox);
        this.box.appendChild(this.rightBox);
    },
DOMready: function () {
        //左边盒子添加图片
        var oImgl = document.createElement('img');
        oImgl.src = this.url;
        oImgl.style.cssText = 'width:100%;height:100%;';
        this.leftBox.appendChild(oImgl);
        //右边盒子添加图片
        var oImgr = document.createElement('img');
        oImgr.setAttribute('id', this.bigImg);
        oImgr.src = this.url;
        oImgr.style.cssText = 'width:' + (this.boxWidth * this.scal) + 'px;height:' + (this.boxHeight * this.scal) + 'px;position:absolute;left:0;top:0;';
        this.rightBox.appendChild(oImgr);
        //添加滤镜及其样式
        var ball = document.createElement('div');
        ball.setAttribute('id', this.ball);
        ball.style.cssText = 'position:absolute;left:0;top:0;width:' + (this.boxWidth / this.scal) + 'px;height:' + (this.boxHeight / this.scal) + 'px;background-color:' + this.ballBg + ';display:none;cursor: move;'
        this.leftBox.appendChild(ball);
    },
DOMbind: function () {
        var ball = document.getElementById(this.ball);
        var rightImg = document.getElementById(this.bigImg);
        var self = this;
        this.box.onmousemove = function (event) {
            var e = event || window.event;
            ball.style.display = 'block';
            self.rightBox.style.display = 'block';
            var l = document.body.scrollLeft || document.documentElement.scrollLeft;
            var t = document.body.scrollTop || document.documentElement.scrollTop;
            var posX = e.clientX + l - this.offsetLeft - ball.offsetWidth / 2;
            var posY = e.clientY + t - this.offsetTop - ball.offsetHeight / 2;
            if (posX < 0) {
                posX = 0;
            } else if (posX > this.clientWidth - ball.offsetWidth) {
                posX = this.clientWidth - ball.offsetWidth
            }
            if (posY < 0) {
                posY = 0;
            } else if (posY > this.clientHeight - ball.offsetHeight) {
                posY = this.clientHeight - ball.offsetHeight;
            }
            ball.style.left = posX + 'px';
            ball.style.top = posY + 'px';
            rightImg.style.left = (-1 * posX * self.scal) + 'px';
            rightImg.style.top = (-1 * posY * self.scal) + 'px';
            this.onmouseout = function () {
                ball.style.display = 'none';
                self.rightBox.style.display = 'none';
            }
        }
    }
}