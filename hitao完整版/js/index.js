$(document).ready(function () {
     $(".adver").hide();
    var timeradver=setTimeout(function(){
        $(".adver").fadeIn();
        
        
    },2000)
    $(".close").click(function(){
        $(this).parent().remove();
        
        
    })
   
    $('.indexheader').load('header.html')
    $(".indexfooter").load('footer.html')
    $.cookie('id','div')
        //轮播图
    var list = {
        urlArr: [{
            url: 'images/index/lbt1.jpg',
            href: ''
            }, {
            url: 'images/index/lbt2.jpg',
            href: ''
            }, {
            url: 'images/index/lbt3.jpg',
            href: ''
            }],
        boxWid: 1190,
        boxHei: 300,
        speed: 2000,
        fadeTim: 400,
        btnSize: 15
    }
    $('.lbt').picMove(list).css({
    })
    //good-show1图片位移
    $(".good-show1ul>li").hover(function () {
        $(this).stop(true).animate({
            'margin-top': '-10px'
        }, 300)
    }, function () {
        $(this).stop(true).animate({
            'margin-top': '0px'
        }, 300)
    })
    //good-show2图片位移
    $(".good-show2ul>li").hover(function () {
        $(this).find("a").stop(true).animate({
            'top': '-10px'
        }, 300)
    }, function () {
        $(this).find("a").stop(true).animate({
            'top': '0px'
        }, 300)
    })
    $(".show2pic-left").hover(function () {
        $(this).stop(true).animate({
            "margin-top": "-10px"
        })
    }, function () {
        $(this).stop(true).animate({
            "margin-top": "0px"
        })
    })
    //show3图片位移
    $(".show3pic-change").hover(function () {
        $(this).stop(true).animate({
            "opacity": "0.5"
        }, 300)
    }, function () {
        $(this).stop(true).animate({
            "opacity": "1"
        }, 300)
    })
    //showall 会员位置图片
    $(".showalri-hy>li").hover(function () {
        $(this).css("box-shadow", "0 0px 10px 0px")
    }, function () {
        $(this).css("box-shadow", "0px 0px 0px 0px")
    })
    //购买商品列表，获取json
    $.get("json/index.json", function (res) {
        imgonload();
        window.onscroll = function () {
            if (load()) {
                imgonload();
                xg();
            }
        }
        function load() {
            var lasttop = $(".gsal>li").eq($(".gsal>li").length - 1).offset().top;
            var winscroll = document.documentElement.scrollTop || document.body.scrollTop;
            var screenheight = document.documentElement.clientHeight || document.body.clientHeight;
            //                alert(lasttop+','+winscroll+','+screenheight);
            if (lasttop < winscroll + screenheight) {
                return true;
            }
        }
        function imgonload() {
            for (var i = 0; i < res.length; i++) {
                var $oLi = $("<li></li>");
                $(".gsal").append($oLi);
                var $gooditem = $("<div></div>");
                $oLi.append($gooditem);
                $gooditem.attr("class", "gooditem")
                var $gooditpic = $("<div></div>")
                $gooditpic.appendTo($gooditem);
                $gooditpic.attr("class", "gooditpic")
                var $gpa = $("<a></a>");
                $gpa.appendTo($gooditpic);
                var $gpimg = $("<img/>");
                $gpimg.attr("src", res[i].pic);
                $gpimg.appendTo($gpa);
                var $gooditintro = $("<div></div>")
                $gooditintro.attr("class", "gooditintro");
                $gooditintro.appendTo($gooditem)
                var $specialtit = $("<div></div>")
                $specialtit.attr("class", "specialtit");
                $specialtit.appendTo($gooditintro);
                var $spimg = $("<img/>");
                $spimg.attr("src", res[i].photo);
                $spimg.appendTo($specialtit);
                var $fhfs = $("<span></span>")
                $fhfs.attr("class", "fhfs");
                $fhfs.html(res[i].transport)
                $fhfs.appendTo($specialtit)
                var $specialtitright = $("<div></div>")
                $specialtitright.attr("class", "specialtit-right")
                $specialtitright.html("距结束")
                $specialtitright.appendTo($specialtit)
                var $sparetime = $("<span></span>")
                $sparetime.attr("class","toTime")
//                $sparetime.html(res[i].totime)
                $sparetime.appendTo($specialtitright)
                var $hst = $("<p></p>");
                $hst.attr("class", "h-special-title")
                $hst.appendTo($gooditintro);
                var $hsta = $("<a></a>")
                $hsta.html(res[i].title)
                $hsta.appendTo($hst);
                var $hs = $("<p></p>")
                $hs.attr("class", "h-specialtxt")
                $hs.html(res[i].intro);
                $hs.appendTo($gooditintro);
                var $hsb = $("<div></div>");
                $hsb.html("￥")
                $hsb.attr("class", "h-special-b");
                $hsb.appendTo($gooditintro);
                var $price1 = $("<span></span>");
                $price1.attr("class", "price1");
                $price1.html(res[i].price1)
                $price1.appendTo($hsb);
                var $price2 = $("<span></span>");
                $price2.attr("class", "price2");
                $price2.html("￥" + res[i].price2)
                $price2.appendTo($hsb);
                var $buy = $("<h4></h4>")
                $buy.attr("class", "buy");
                $buy.attr("id", res[i].id);
                $buy.appendTo($hsb);
                var $buya = $("<a></a>");
                $buya.html("立即抢购");
                $buya.appendTo($buy);
                
                
                date(res[i].totime,$sparetime)
                
                
                
                
                
            }
        }
        //控制动态图片的滑动效果
        function xg(){
            
       
        $(".gsal>li").hover(function () {
            $(this).find("img").eq(0).stop(true).animate({
                "margin-top": "-30px",
                "margin-left": "-30px",
                width: "120%",
                height: "120%"
            }, 1000)
        }, function () {
            $(this).find("img").eq(0).stop(true).animate({
                "margin-top": "0px",
                "margin-left": "0px",
                width: "100%",
                height: "100%"
            }, 1000)
        })
        
        
        $(".buy").click(function(){
            var id=$(this).attr("id");
            $.cookie("id",id);
           
            window.location.href="gdetails.html";
            
        })
        
      }
        
    xg();
        
        
        
        
        
        
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
obj.html(day+"天"+hou+":"+min+":"+s);
                    }, 1000)
                }
            }
    
    
    
    
})