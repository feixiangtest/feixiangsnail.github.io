$(function () {
    $('.bheader').load('header.html')
    $(".bfooter").load('footer.html')
	$.get("json/index.json",function(res){
        //添加商品
		var arr=[];
        var arr2=[];
		for(var i=0;i<res.length;i++){
		var s=$.cookie(i+"id");
            var s2=$.cookie(i+"numb")
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
        			'<input type="checkbox" class="bchk"/>'+	
        			'</td>'+
        			'<td>'+
        				'<div class="bgoodpic"><img src="'+res[value].pic+'"alt=""></div>'+
        				'<p class="introdu">'+res[value].intro+
        				'</p>'+
        			'</td>'+
        			'<td><span class="prices">'+res[value].price1+'</span></td>'+
        			'<td>'+
        			'<div class="shuliang">'+
        				'<input type="button" class="add" value="+">'+
        				'<input type="text" class="numbe" value='+arr2[index]+'>'+
        			'<input type="button" class="dive" value="-">'+
        			'</div>'+
        			'</td>'+
        			'<td><span class="xiaoji">'+(parseFloat(res[value].price1)*parseInt(arr2[index]))+
        			'</span></td>'+
        			'<td><div class="remove" id='+res[value].id+'>删除</div></td>'+
        		'</tr>';
	})
	$(".tbody").append(trs);

$(".add").click(function(){
   // var count1=$(this).parent().find(".numbe").val();
     $(this).next().next().css({"background":""})
     var count1=$(this).next().val();
    if(count1<1){
        count1=0;
    }
    count1++;
    $(this).next().val(count1);
    var perprice= $(this).parent().parent().prev().find(".prices").html();
    $(this).parent().parent().next().find(".xiaoji").html(count1*perprice)
    showprice()
})
$(".dive").click(function(){
     var count1=$(this).prev().val();
    if(count1<=1){
        $(this).css({"background":"gray"})
        count1=1;
    }
    else{
         $(this).css({"background":""})
      count1--;  
    }
    $(this).prev().val(count1);
    var perprice= $(this).parent().parent().prev().find(".prices").html();
    $(this).parent().parent().next().find(".xiaoji").html(count1*perprice)
    showprice()
})
$(".numbe").blur(function(){
    if($(this).val()<=1){
        $(this).val(1);
    }
    var perprice= $(this).parent().parent().prev().find(".prices").html();
     $(this).parent().parent().next().find(".xiaoji").html(perprice*$(this).val());
    showprice()
})
$(".bchk").click(function(){
showprice()
})
 function showprice(){
   var allPrice=0;
    for(var i=0;i<arr.length;i++){
        if($(".bchk").eq(i).is(":checked")){
            allPrice+=parseFloat($(".xiaoji").eq(i).html());
        }
        if($(".bchk").eq(i).is(":checked")==false){
            $("#checkall").prop("checked",false)
        }
    }
     $(".allprice").html(allPrice); 
       }
$("#checkall").click(function(){
        $(".bchk").prop("checked",$(this).is(":checked"));
            showprice()
})
       $(".remove").css("cursor","pointer")  
    $(".remove").click(function(){
$(this).parent().parent().remove();
        var rid=$(this).attr("id")
alert($(this).attr("id"));
      $.cookie(rid+"id",null);
showprice();
 }) 
    var arr3=[];
    $(".toBuy").click(function(){
        
        for(var j=0;j<$(".bchk").length;j++){
            
            if($(".bchk").eq(j).is(":checked")){
               
                arr3.push(j);
                
            }
        }
        
       
        
        
        for(var i=0;i<arr3.length;i++){
       
     $.cookie($(".remove").eq(arr3[i]).attr("id")+"js",$(".remove").eq(arr3[i]).attr("id"))       
            $.cookie($(".remove").eq(arr3[i]).attr("id")+"sl",$(".numbe").eq(arr3[i]).val())
        }
        
       window.location="jiesuan.html"
    })
    
    
    
    
    
    
    
    
    
	})
})