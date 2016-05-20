 $(function(){
        $.get("json/login.json",function(res){
            var arr=[];
            
            for(var i=0;i<res.length;i++){
                arr.push(res[i].user+":"+res[i].pasd)
                
            }
           
           
            
     $('.loheader').load('header.html .logo')
    $(".lofooter").load('footer.html')
     var zcyz7=false,zcyz8=false;
     
     
      $(".telein").focus(function () {
        $(".teles2").css("display", "none")
        $(this).parent().css("border", "2px solid green")
    })
     
     
     
     $(".telein").blur(function () {
        var reg = /^[1][1-9]\d{9}$/;
        var teleinval = $(".telein").val();
        if (reg.test(teleinval) == true) {
            zcyz7 = true;
            $(this).parent().css("border", "1px solid gray")
        } else {
            zcyz7 = false;
            $(".teles2").css("display", "block")
            $(".teles2").html("手机格式有误，请重新输入")
            $(this).parent().css("border", "2px solid red")
        }
       
    })
     
     
     
        //密码验证
        $(".pwdin").focus(function () {
            $(".pwds2").css("display", "none")
            $(this).parent().css("border", "2px solid green")
        })
        $(".pwdin").blur(function () {
                var regpwd = /^[a-z0-9_-]{6,18}$/;
                var pwdinval = $(".pwdin").val();
                if (regpwd.test(pwdinval) == true) {
                    zcyz8 = true;
                    $(this).parent().css("border", "1px solid gray")
                } else {
                    zcyz8 = false;
                    $(".pwds2").css("display", "block")
                    $(".pwds2").html(" 请输入6-20位字母、数字或字符")
                    $(this).parent().css("border", "2px solid red")
                }
               
            })
     
     $(".loginin").click(function(){
         
      
//             for(var i=0;i<res.length;i++){
//                 if($(".telein").val()==res[i].user&&$(".pwdin").val()){
//                     console.log("登录成功")
//                     return;
//                 }
//                 else{
//                     console.log("账号和密码不一致，请重新输入")
//                 }
//             }
           if(arr.indexOf($(".telein").val()+":"+$(".pwdin").val())!=-1){
               alert("登录成功")
           }  
         else{

             alert("用户名和密码不匹配，请重新输入")
         }

         
         
         })
         
         
         
         

     })
     
     
 })



