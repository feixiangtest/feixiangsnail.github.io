$(function () {
    $('.siheader').load('header.html .logo')
    $(".sifooter").load('footer.html')
    $(".telein").focus(function () {
        $(".teles2").css("display", "none")
        $(this).parent().css("border", "2px solid green")
    })
    var zcyz1 = false;
    var zcyz2 = false;
    var zcyz3 = false;
    var zcyz4 = false;
    var zcyz5 = false;
    var zcyz6 = false;
    $(".telein").blur(function () {
        var reg = /^[1][1-9]\d{9}$/;
        var teleinval = $(".telein").val();
        if (reg.test(teleinval) == true) {
            zcyz1 = true;
            $(this).parent().css("border", "1px solid gray")
        } else {
            zcyz1 = false;
            $(".teles2").css("display", "block")
            $(".teles2").html("手机格式有误，请重新输入")
            $(this).parent().css("border", "2px solid red")
        }
        nex();
    })
    //生成随机数
    function fn() {
        var arr = [];
        for (var j = 0; j < 4; j++) {
            var a = 0;
            while (!(a <= 57 && a >= 48 || a <= 90 && a >= 65 || a <= 122 && a >= 97)) {
                a = Math.floor(Math.random() * 150 + 0)
            }
            arr[j] = (String.fromCharCode(a));
        }
        var s2 = arr.join("");
        return s2;
    }
    var yzm = fn();
    $(".yzma").html(yzm);
    $(".yzma").click(function () {
        $(".yzma").html(fn());
    })
    $(".yzmin").focus(function () {
        $(".yzms2").css("display", "none")
        $(this).parent().css("border", "2px solid green")
    })
    $(".yzmin").blur(function () {
        var yzminval = $(".yzmin").val();
        if (yzminval.toUpperCase() === $(".yzma").html().toUpperCase()) {
            zcyz2 = true;
            $(this).parent().css("border", "1px solid gray")
        } else {
            zcyz2 = false;
            $(".yzms2").css("display", "block")
            $(".yzms2").html("验证码有误，请重新输入")
            $(".yzma").html(fn());
            $(this).parent().css("border", "2px solid red")
        }
        nex();
    })
    $(".dxyzmin").focus(function () {
        $(".dxyzms2").css("display", "none")
        $(this).parent().css("border", "2px solid green")
    })
    $(".dxyzmin").blur(function () {
            var dxyzminval = $(".dxyzmin").val();
            if (dxyzminval.toUpperCase() === $(".yzma").html().toUpperCase()) {
                zcyz3 = true;
                $(this).parent().css("border", "1px solid gray")
            } else {
                zcyz3 = false;
                $(".dxyzms2").css("display", "block")
                $(".dxyzms2").html("验证码有误，请重新输入")
                $(this).parent().css("border", "2px solid red")
               
            }
            nex();
        })
        //点击下一步的封装
    function nex() {
        if (zcyz1 && zcyz2 && zcyz3) {
            $(".next").css({
                "background": "#e10482",
                "cursor": "pointer"
            })
            $(".next").click(function () {
                $(".joinb-rtop").css("display", "none")
                $(".joinb-rbottom").css("display", "block")
                signstart();
            })
        }
    }
    function signstart() {
        //第二个注册栏的注册
        $(".ncin").focus(function () {
            $(".ncs2").css("display", "none")
            $(this).parent().css("border", "2px solid green")
        })
        //用户名验证
        $(".ncin").blur(function () {
            var regnc = /^[a-z0-9_-]{3,16}$/;
            var ncinval = $(".ncin").val();
            if (regnc.test(ncinval) == true) {
                zcyz4 = true;
                $(this).parent().css("border", "1px solid gray")
            } else {
                zcyz4 = false;
                $(".ncs2").css("display", "block")
                $(".ncs2").html(" 2-20个字符，支持中文字母数字及“_”、“-”、“@”组合")
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
                    zcyz5 = true;
                    $(this).parent().css("border", "1px solid gray")
                } else {
                    zcyz5 = false;
                    $(".pwds2").css("display", "block")
                    $(".pwds2").html(" 请输入6-20位字母、数字或字符")
                    $(this).parent().css("border", "2px solid red")
                }
                if ($(".surepwdin").val() != "") {
                    if (pwdinval != $(".surepwdin").val()) {
                        $(".surepwds2").css("display", "block")
                        $(".surepwds2").html("密码输入不一致，请重新输入")
                    }
                }
            })
            //确认密码
        $(".surepwdin").focus(function () {
            $(".surepwds2").css("display", "none")
            $(this).parent().css("border", "2px solid green")
        })
        $(".surepwdin").blur(function () {
            var pwdinval = $(".pwdin").val();
            if ($(this).val() == "") {
                zcyz6 = false;
                $(this).parent().css("border", "2px solid red")
                $(".surepwds2").css("display", "block")
                $(".surepwds2").html("密码不能为空")
            } else if ($(this).val() != pwdinval) {
                zcyz6 = false;
                $(this).parent().css("border", "2px solid red")
                $(".surepwds2").css("display", "block")
                $(".surepwds2").html("密码输入不一致，请重新输入")
            } else {
                zcyz6 = true;
                $(this).parent().css("border", "1px solid gray")
            }
        })
        //第二部结束的封装
        $(".signin").click(function () {
            if (zcyz4 && zcyz5 && zcyz6 && ($("#agree").is(":checked"))) {
                 
                
                
                
                
                
                
                
                
                
                alert("注册成功")
                
                
                
                
                
            } else {
                alert("请正确填写信息")
            }
        })
    }
    
    
    
    
    
    
    
})