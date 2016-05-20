/**
    jQuery大图轮播
    
    urlArr: '',     图片以及要跳转的链接
    boxWid: 800,     外层容器的宽度
    boxHei: 600,    外层容器的高度
    speed: 3000,     轮播速度
    fadeTim: 500,    淡入淡出速度
    btnSize: 30      小按钮大小
    
    urlArr = [{
            url: '1.jpg',    图片路径
            href: ''         跳转链接路径
        }]
*/





(function ($) {
    $.fn.picMove = function (opts) {
        var settings = {
            urlArr: '',
            boxWid: 1152,
            boxHei: 411,
            speed: 3000,
            fadeTim: 400,
            btnSize: 30
        }
        $.extend(settings, opts);
        //创建及插入图片,创建按钮
        var $oUL = $('<ul></ul>');
        var $oDiv = $('<div id="oDiv"></div>');
        var $lBtn = $('<div id="prev"  onselectstart="return false">&lt;</div>');
        var $rBtn = $('<div id="next"  onselectstart="return false">&gt;</div>');
        $.each(settings.urlArr, function (index, items) {
                $oUL.append('<li><a href=' + items.href + '><img src=' + items.url + ' title="图片"></a></li>');
                $oDiv.append('<span></span>');
            })
            /*设置自定义样式*/
            //设置图片及其容器样式
        $oUL.css({
                'width': settings.boxWid + 'px',
                'height': settings.boxHei + 'px',
                'position': 'relative',
                'list-style': 'none'
            }).children('li').css({
                'width': '100%',
                'height': '100%',
                'position': 'absolute',
                'left': '0',
                'top': '0',
                'display': 'none'
            }).find('img').css({
                'width': '100%',
                'height': '100%'
            }).end().eq(0).show()
            //设置按钮样式
        $oDiv.css({
            'position': 'absolute',
            'width': (settings.btnSize + 8) * settings.urlArr.length + 'px',
          
            'right': '50px',
            'bottom': '0px',
            
        }).children('span').css({
            'display': 'inline-block',
            'width': settings.btnSize + 'px',
            'height': settings.btnSize + 'px',
            'margin-right': '8px',
            'background': 'rgba(255,255,255,0.5)',
            'cursor': 'pointer',
            'border-radius':'50%'
        }).eq(0).css('background', 'rgba(255,255,255,1)')
        $lBtn.css({
            'font-size': '40px',
            'padding': '10px 5px',
            'position': 'absolute',
            'left': '0',
            'top': (settings.boxHei / 2 - 30) + 'px',
            'color': '#ffffff',
            'display': 'none',
            'background': 'rgba(0,0,0,0.5)',
            'cursor': 'pointer',
            'border-radius':'50%'
        })
        $rBtn.css({
                'font-size': '40px',
                'padding': '10px 5px',
                'position': 'absolute',
                'right': '0',
                'top': (settings.boxHei / 2 - 30) + 'px',
                'color': '#ffffff',
                'display': 'none',
                'background': 'rgba(0,0,0,0.5)',
                'cursor': 'pointer',
                'border-radius':'50%'
            })
            //放入容器中
        $(this).css({
            'width': settings.boxWid + 'px',
            'height': settings.boxHei + 'px',
            'position': 'relative'
        }).append($oUL, $oDiv, $lBtn, $rBtn);
        //添加动画
        var $index = 0;
        var self = $(this);
        var $lis = $(this).find('li');
        var $btns = $('#oDiv>span');
        //自动轮播
        self.timer = setInterval(move, settings.speed)

        function move() {
            $index++;
            if ($index > $lis.length - 1) {
                $index = 0;
            }
            $lis.eq($index).fadeIn(settings.fadeTim).siblings('li').fadeOut(settings.fadeTim);
            $btns.eq($index).css('background', 'rgba(255,255,255,1)').siblings('span').css('background', 'rgba(255,255,255,0.5)')
        }
        //鼠标滑过小按钮切换
        $btns.hover(function () {
                clearInterval(self.timer)
                $(this).css('background', 'rgba(255,255,255,1)').siblings('span').css('background', 'rgba(255,255,255,0.5)')
                $index = $(this).index();
                $lis.eq($index).stop(true).fadeIn(settings.fadeTim).siblings('li').stop(true).fadeOut(settings.fadeTim);
            }, function () {
                if (self.timer) {
                    clearInterval(self.timer)
                };
                self.timer = setInterval(move, settings.speed)
            })
            //鼠标点击左右按钮切换
        $(this).hover(function () {
            var $i = $index;
            clearInterval(self.timer);
            //按钮淡入
            $('#prev').stop(true).fadeIn(300).siblings('#next').stop(true).fadeIn(300);
            //左按钮的点击事件
            $('#prev').on('click', function () {
                    clearInterval(self.timer);
                    $i--;
                    $index = $i;
                    if ($i < 0) {
                        $i = $lis.length - 1;
                    }
                    $lis.eq($i).stop(true).fadeIn(settings.fadeTim).siblings('li').stop(true).fadeOut(settings.fadeTim);
                    $btns.eq($i).css('background', 'rgba(255,255,255,1)').siblings('span').css('background', 'rgba(255,255,255,0.5)')
                })
                //右按钮的点击事件
            $('#next').on('click', function () {
                clearInterval(self.timer);
                $i++;
                $index = $i;
                if ($i > $lis.length - 1) {
                    $i = 0;
                }
                $lis.eq($i).stop(true).fadeIn(settings.fadeTim).siblings('li').stop(true).fadeOut(settings.fadeTim);
                $btns.eq($i).css('background', 'rgba(255,255,255,1)').siblings('span').css('background', 'rgba(255,255,255,0.5)')
            })
        }, function () {
            if (self.timer) {
                clearInterval(self.timer)
            };
            self.timer = setInterval(move, settings.speed);
            $('#prev').stop(true).fadeOut(300).siblings('#next').stop(true).fadeOut(300);
        })
        return this;
    }
})(jQuery)