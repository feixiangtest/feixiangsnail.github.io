$(function () {
    $('.bheader').load('header.html')
    $(".bfooter").load('footer.html')
	$.get("json/index.json",function(res){
        //添加商品
		var arr=[];
        var arr2=[];
		for(var i=0;i<res.length;i++){
		var s=$.cookie(i+"js");
            var s2=$.cookie(i+"sl")
			if(s!=null){
				arr.push(s);
			}
			if(s2!=null){
                arr2.push(s2);
            }
		}
		var trs="";
	$.each(arr,function(index,value){
		trs+='<tr>'+
        		
        			'<td>'+
        				'<div class="bgoodpic"><img src="'+res[value].pic+'"alt=""></div>'+
        				'<p class="introdu">'+res[value].intro+
        				'</p>'+
        			'</td>'+
        			'<td><span class="prices">'+res[value].price1+'</span></td>'+
        			'<td>'+
        			'<div class="shuliang">'
        			+arr2[index]+
        			'</div>'+
        			'</td>'+
        			'<td><span class="xiaoji">'+(parseFloat(res[value].price1)*parseInt(arr2[index]))+
        			'</span></td>'+
        			
        		'</tr>';
	})
	$(".tbody").append(trs);



 
   var allPrice=0;
    for(var i=0;i<arr.length;i++){
       
            allPrice+=parseFloat($(".xiaoji").eq(i).html());
      
       
         
     
    }
     $(".allprice").html(allPrice); 
      
//
//       $(".remove").css("cursor","pointer")  
//    $(".remove").click(function(){
//$(this).parent().parent().remove();
//        var rid=$(this).attr("id")
//alert($(this).attr("id"));
//      $.cookie(rid+"id",null);
//
// })
   
        $(".dj").click(function(){
$(".tankuang").show();
    
    
    
    
	})
    
      $(".closetan").click(function(){
$(".tankuang").hide();
    
    
    
    
	})
          $(".bc,.cancel").click(function(){
$(".tankuang").hide();
    
    for(var j=0;j<arr.length;j++){
        $.cookie(arr[j]+"js",null);
         $.cookie(arr[j]+"sl",null);
        
         $.cookie(arr[j]+"id",null);
         $.cookie(arr[j]+"numb",null);
    }
    
   
	})
     var pro = $("#pro");
        var city = $("#city");
        var area = $("#area");
        var stb = function (e) {
            if (e.stopPropagation) {
                e.stopPropagation()
            } else {
                e.cancelBubble = true;
            }
        }
        pro.click(function (e) {
            stb(e);
            pro.find("dd").remove();
            city.find("dd").remove();
            city.find("dt").html("城市")
            area.find("dd").remove();
            area.find("dt").html("县区")
            for (var i = 0; i < oPro.length; i++) {
                pro.append("<dd>" + oPro[i] + "</dd>")
            }
            pro.find("dd").show().click(function (e) {
                city.css("background", "white");
                area.css("background", "gray");
                stb(e);
                par = $(this);
                city.find("dd").remove();
                for (var i = 0; i < oCity[($(this).index("dd"))].length; i++) {
                    city.append("<dd>" + oCity[($(this).index("dd"))][i] + "</dd>")
                }
                pro.find("dd").hide();
                pro.find("dt").html($(this).html());
                city.click(function (e) {
                    stb(e);
                    area.find("dd").remove();
                    area.find("dt").html("县区")
                    city.find("dd").show().click(function (e) {
                        stb(e);
                        area.css("background", "white")
                        area.find("dd").remove();
                        for (var i = 0; i < oArea[par.index("dd")][$(this).index() - 1].length; i++) {
                            area.append("<dd>" + oArea[(par.index("dd"))][$(this).index() - 1][i] + "</dd>")
                        }
                        city.find("dd").hide();
                        city.find("dt").html($(this).html());
                        area.click(function (e) {
                            stb(e);
                            area.find("dd").show().click(function (e) {
                                if (e.stopPropagation) {
                                    e.stopPropagation()
                                } else {
                                    e.cancelBubble = true;
                                }
                                area.find("dd").hide();
                                area.find("dt").html($(this).html());
                            });
                        })
                    })
                })
            })
        })
        $(this).click(function () {
            $("dd").hide();
        })
 
   
   
   
   }) 







})