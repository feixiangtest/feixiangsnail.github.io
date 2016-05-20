$(function(){
    //点击分类
    var key=false;
$('.h-navright').click(function(){
   if(key==true){
       $(this).find('img').attr('src','images/main/h-navright.jpg');
    $(this).find('span').html('查看分类');
       $('.clasify').hide();
       key=false;
   } 
   else{
      $(this).find('img').attr('src','images/main/nav-right2.jpg');
    $(this).find('span').html('收起分类');
       $('.clasify').show();
       key=true; 
   }
})
//分类菜单 三级菜单信息
$.get('json/data.json',function(res){
    for(var a=0;a<res.clasigoods.length;a++){
         var $lis=$("<li></li>");
        var $lisa=$("<a></a>");
      var $lisad=$('<div></div>');
        $lisad.css({"position":"absolute","top":"16px","background":'url(images/main/lisad.jpg) center center no-repeat',"right":"-6px","width":'6px',"height":'15px','display':'none'})
        $lisa.css({"background":res.clasigoods[a].background,"text-align":"center"});
        $lis.attr("class","clasigooda");
        $lisad.attr("class","lisad");
        $lisa.html(res.clasigoods[a].info);
         $lisa.append($lisad);
       $lis.append($lisa);
       $(".clasigoods").append($lis);
   //二级菜单
    var $clatopul=$("<ul></ul>");
    $(".clasifyr-top").append($clatopul);
    $clatopul.attr("class","flxx")
    $(".flxx").eq(a).hide();
  for(var i=0;i<res.goodinfo[a].length;i++){
    var $clatopulli=$("<li></li>");
    $clatopul.append($clatopulli);
      var $clatopullih=$("<h3></h3>");
      $clatopulli.append($clatopullih);
      var $clatopullidiv=$("<div></div>");
     $clatopulli.append($clatopullidiv); 
   $clatopullih.html(res.goodinfo[a][i][0].titlename);
 for(var j=1;j<res.goodinfo[a][i].length;j++){
   var $clatopullidiva=$("<a></a>");
$clatopullidiv.append($clatopullidiva);
$clatopullidiva.html(res.goodinfo[a][i][j].titlename)
 }
 }
    }
      $(".clasigooda").eq(0).css("background","black");
        $(".clasigooda").eq(0).find('.lisad').show();
        $(".flxx").eq(0).show();
    $(".clasigooda").hover(function(){
        for(var i=0;i<$(".flxx").length;i++){
             $(".flxx").eq(i).hide();
             $(".clasigooda").eq(i).find('.lisad').hide();
            $(this).find('.lisad').hide();
            $(".clasigooda").eq(i).css("background","#f6f6f6");
        }
        $(this).css("background","black");
        $(this).find('.lisad').show();
$(".flxx").eq($(this).index()).show();
    })
}) 
//侧边栏
//定义一个数组，图片整合里面的高度放入一个数组里面
var arrf=[0,-121,-242,-275,-305,-338]
//划过事件
$(".fixside-top>li").hover(function(){
    $(this).find('a').css({'background':'url(images/main/fix.png) -35px '+(arrf[$(this).index()])+'px no-repeat'})
    
    $(this).find('div').show();
 $(this).find('div').stop(true).animate({
    'right':'36px',
        'opacity':'1'
    },300,function(){
     $(this).parent().find('h5').show();
 })
},function(){
     $(this).find('a').css({'background':'url(images/main/fix.png) 0px '+(arrf[$(this).index()])+'px no-repeat'})
      $('.fixside-top>li').eq(0).find('a').css({'background':'url(images/main/fix.png) -35px 0px no-repeat'})
      $(this).find('h5').hide();
    $(this).find('div').stop(true).animate({
    'right':'55px',
        'opacity':'0'
    },300,function(){$(this).hide()})
})


$(".fixside-bottom>li").hover(function(){
    $(this).find('a').css({'background':'url(images/main/fix.png) -36px '+(arrf[$(this).index()+4])+'px no-repeat'})
    
    $(this).find('div').show();
 $(this).find('div').stop(true).animate({
    'right':'36px',
        'opacity':'1'
    },300,function(){
     $(this).parent().find('h5').show();
 })
},function(){
     $(this).find('a').css({'background':'url(images/main/fix.png) 0px '+(arrf[$(this).index()+4])+'px no-repeat'})
      $('.fixside-top>li').eq(0).find('a').css({'background':'url(images/main/fix.png) -36px 0px no-repeat'})
      $(this).find('h5').hide();
    $(this).find('div').stop(true).animate({
    'right':'55px',
        'opacity':'0'
    },300,function(){$(this).hide()})
})

$(".fix-ba2").click(function(){
    $("body,html").animate({
        "scrollTop":'0'
    })
    
})
//购物车点击事件
$("#gwd").click(function(){
	
	
window.location="buy.html"
	
	
})

})