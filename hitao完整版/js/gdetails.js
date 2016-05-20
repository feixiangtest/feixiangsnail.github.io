







$(function () {
    $('.gdheader').load('header.html');
    $(".gdfooter").load('footer.html');
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     var id=parseInt($.cookie("id"));
    
    $.get("json/index.json",function(res){
       var $a=$("<a></a>")
        var $p=$("<p></p>");
        var $div=$("<div></div>");
        var $span=$("<span></span>")
        
        var $li=$("<li></li>");
        var $proli=$li;
        $(".uproduct").append($proli);
        $proli.attr("class","product");
        var $mbq=$p;
        $mbq.appendTo($proli);
        $mbq.attr("class","mbq");
        var $mbqa=$a;
        $mbqa.html("首页");
        $mbqa.attr("href","index.html")
        $mbqa.appendTo($mbq);
    var $mbqs=$span;
        $mbqs.attr("class","mbqs");
        $mbqs.html(">"+res[id].title);
        $mbqs.appendTo($mbq);
        var $htg=$div;
        $htg.attr("class","ht_gallery")
        $htg.appendTo($proli);
        var $brand_name=$("<div></div>")
        $brand_name.attr("class","brand_name");
       $htg.append($brand_name);
        var $flag=$("<div></div>")
        $flag.attr("class","flag");
        $flag.appendTo($brand_name);
        var $flagimg=$("<img/>")
       $flagimg.attr("src",res[id].photo)
        $flagimg.appendTo($flag);
        var $pro_name=$("<h3></h3>");
        $pro_name.attr("class","pro_name")
        $pro_name.html(res[id].title)
        $pro_name.appendTo($brand_name)
        var $ht_pic=$("<div></div>")
        $ht_pic.attr("class","ht_pic");
        $ht_pic.appendTo($htg);
       var $ht_picimg=$("<img/>")
        $ht_picimg.attr("src",res[id].pic)
        $ht_picimg.appendTo($ht_pic);
        var $lover=$("<a></a>")
        $lover.attr("class","lover");
        $lover.appendTo($ht_pic);
        var $taozi=$("<h6></h6>")
        $taozi.attr("class","taozi");
        $taozi.appendTo($lover);
        var $personnum=$("<span></span>")
        $personnum.attr("class","personnum");
        $personnum.html(100);
        $personnum.appendTo($lover);
         var $personnums=$("<span></span>")
        
        $personnums.html("人收藏");
        $personnums.appendTo($lover);
        
       var $pro_info=$("<div></div>")
        $pro_info.attr("class","pro_information")
        $pro_info.appendTo($proli)
        var $cout_down=$("<div></div>")
        $cout_down.attr("class","cout_down");
      
        $cout_down.appendTo($pro_info);
        var $time=$("<span></span>")
        $time.html("12:00:00")
        $time.attr("class","time");
        var $dec=$("<p></p>")
        $dec.attr("class","dec");
        $dec.html(res[id].intro)
        $dec.appendTo($pro_info);
       var $gprice=$("<div></div>")
        $gprice.attr("class","gprice");
        $gprice.html("￥");
        $gprice.appendTo($pro_info);
        var $gprice_s=$("<span></span>")
        $gprice_s.attr("class","gprice_s")
        $gprice_s.html(res[id].price1)
        $gprice_s.appendTo($gprice);
        var $oldprice=$("<p></p>")
        $oldprice.attr("class","oldprice")
        $oldprice.html("官方指导价￥")
        
        $oldprice.appendTo($pro_info);
        var $oprice=$("<span></span>")
        $oprice.html(res[id].price2);
        $oprice.attr("class","oprice")
        $oprice.appendTo($oldprice);
        var $ds=$("<div></div>");
        $ds.attr("class","details-smt");
        $ds.appendTo($pro_info);
        var $by=$("<span></span>")
        $by.attr("class","by");
        $by.html("包邮");
        $ds.append($by);
        $ds.append("全场包邮")
        var $dst=$("<div></div>")
        $dst.attr("class","details-smt");
        $dst.appendTo($pro_info);
        var $by2=$("<span></span>")
        $by2.attr("class","by");
        $by2.html("送券");
        $dst.append($by);
        $dst.append("我要0关税满100返200");
        var $trans=$("<p></p>")
        $trans.html(res[id].transport);
        $trans.attr("class","trans")
        $trans.appendTo($pro_info);
        
       var $ht_amount=$("<div></div>")
        $ht_amount.attr("class","ht_amount")
        $ht_amount.appendTo($pro_info);
        var $sl=$("<span></span>")
        $sl.attr("class","sl")
        $sl.appendTo($ht_amount)
        $sl.html("数量：")
        var $amount=$("<div></div>");
        $amount.attr("class","amount")
        $amount.appendTo($ht_amount)
        var $add=$("<span></span>")
        $add.attr("class","add")
        $add.appendTo($amount)
        $add.html("+");
        var $number=$("<input/>")
        $number.attr("class","number");
        $number.appendTo($amount);
        var $dive=$("<span></span>")
        $dive.attr("class","dive");
        $dive.appendTo($amount);
        $dive.html("-");
        var $ht_action=$("<div></div>")
        $ht_action.attr("class","ht_action")
        $ht_action.appendTo($pro_info);
        var $htal=$("<a></a>")
        $htal.attr("class","htaction-l");
        $htal.attr("id",res[id].id);
        $htal.html("立即购买");
        $htal.appendTo($ht_action);
        
         var $htar=$("<a></a>")
        $htar.attr("class","htaction-r");
        
        $htar.html("加入购物袋");
        $htar.appendTo($ht_action);
        
        
        date(res[id].totime,$cout_down)
        
        
        
        //计算数量
         var countn=1;
        var zs=0;
    $(".number").val(countn);
    $(".add").click(function(){
        
        countn=$(".number").val();
        if(countn<1){
            countn=0;
        }
        countn++;
       
        $(".number").val(countn);
    })
     $(".dive").click(function(){
         countn=$(".number").val();
        if(countn>1){
            countn--;
        }
         else{countn=1;}
       
        $(".number").val(countn);
    })
        
        
        
        
        
        
        //加入购物袋事件
        
        $htar.click(function(){
            var high=$htar.offset().top;
             var lef=$htar.offset().left;
          var high2=$(".fix-ta2").offset().top;
            var lef2=$(".fix-ta2").offset().left;
            
            
            var $ball=$("<div></div>")
            $ball.appendTo($("body"));
            $ball.css({
                "background":"red","position":"absolute","top":high+"px","left":lef+"px","border-radius":"50%","width":"30px","height":"30px"
            })
            $ball.animate({
                "top":high2+"px",
                "left":lef2+"px"
                
            },1000,function(){
                $(this).remove();
            })
            
           var n= parseInt($(".number").val());
            
            zs+=n;
            
           $.cookie(id+"id",id);
             $.cookie(id+"numb",zs);
           
            
        })
        
        $htal.click(function(){
            
                 var n= parseInt($(".number").val());
            
            zs+=n;
            
           $.cookie(id+"bid",id);
             $.cookie(id+"bnumb",zs);
           
              window.location.href="buynow.html";
        })
        
        
        
        
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
        oImgr.style.cssText = 'width:' + (this.boxWidth * this.scal) + 'px;height:' + (this.boxHeight * this.scal) + 'px;position:absolute;left:0;top:0;z-index:999;';
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
        
        
        
        
        
      
      var mag = new magnifier({
        'class':'ht_pic',                                
        'scal': 3,                                  //放大镜倍数
        'boxWidth': 300,                            //盒子宽度  会影响图片宽度
        'boxHeight': 300,                           //盒子高度  会影响图片高度
        'ballBg': 'rgba(14, 227, 245, 0.24)',       //滤镜背景颜色
        'url': res[id].pic,                             //目标图片
        'ball':'ball',                              //图片上的鼠标
        'bigImg':'img1'                             //大图
    })
   
        
       function date(time,obj) {
            var date_1 = new Date(time);
            var date_2 = new Date();
            var time;
            var t = Math.floor((date_1 - date_2) / 1000);
            var h1 = Math.floor(t / 3600);
            var h = Math.floor(t / 3600) % 24;
            var d = Math.floor(h1 / 24);
            var m = Math.floor(t / 60) % 60;
            var s1 = t % 60;
var s,min,hou,day;
            if (t <= 0) {
                s = '00';
                min= '00';
                hou = '00';
                day= '00';
            } else {
                if (s1 < 10) {
                    s = '0' + s1;
                } else {
                    s = s1;
                }
                if (m < 10) {
                    min = '0' + m;
                } else {
                    min= m;
                }
                if (h < 10) {
                    hou = '0' + h;
                } else {
                    hou= h;
                }
                if (d < 10) {
                    day= '0' + d;
                } else {
                    day = d;
                    }
                    time = setInterval(function () {
                        t--;
                        h1 = Math.floor(t / 3600);
                        h = Math.floor(t / 3600) % 24;
                        m = Math.floor(t / 60) % 60;
                        s1 = t % 60;
                        d = Math.floor(h1 / 24);
                        if (s1 < 10) {
                            s = '0' + s1;
                        } else {
                            s = s1;
                        }
                        if (m < 10) {
                            min= '0' + m;
                        } else {
                            min= m;
                        }
                        if (h < 10) {
                            hou= '0' + h;
                        } else {
                            hou= h;
                        }
                        if (d < 10) {
                            day = '0' + d;
                        } else {
                            day = d;
                        }
                        if (t == 0) {
                            clearInterval(timer);
                            t -= 0;
                        }
obj.html("活动剩余:"+day+"天"+hou+":"+min+":"+s);
                    }, 1000)
                }
            }  
        
        
        
        
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
  

   
    
    
    
    
    
    
    
    
    
    
})