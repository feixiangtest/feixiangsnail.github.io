<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>微信分享</title>
</head>

<body>
    share
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="axios.min.js"></script>
<script>
var url =location.href.split('#')[0]; 
alert(url,'url')
'<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx83f2773ff212dde3", "e9d4406f4f0eb1e23b8a6bce2cda4c91");
$signPackage = $jssdk->GetSignPackage();
?>'
    var WxShare2 = {
        
        config:{
        debug: true,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: '<?php echo $signPackage["timestamp"];?>',
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
                    ]
              },
        init: function (shareData) {
            let that = this;
            axios.get("http://mda2222.com/sample/jssdk.php").then(function (data) {
                console.log(data,'data');
                that.config.appId = data.data.appId;
                // that.config.timestamp = data.data.timestamp.toString();
                // that.config.nonceStr = data.data.nonceStr;
                // that.config.signature = data.data.signature;
                that.share(shareData);
            }).catch(function (d) {
                console.log(d, 'failed');
            });

        },
        
        share: function (shareData) {
            console.log(this.config, 'config')
            wx.config(this.config);

            wx.ready(function () {

                var shareTitle = shareData.shareTitle;
                var shareImg = shareData.shareImg;
                var shareDesc = shareData.shareDesc;

                wx.onMenuShareTimeline({
                    title: shareTitle,
                    link: window.location.href,
                    imgUrl: shareImg
                });
                wx.onMenuShareAppMessage({
                    title: shareTitle,
                    desc: shareDesc,
                    link: window.location.href,
                    imgUrl: shareImg,
                    type: 'link'
                });
                //分享到QQ
                wx.onMenuShareQQ({
                    title: shareTitle,
                    desc: shareDesc,
                    link: window.location.href,
                    imgUrl: shareImg
                });
                wx.onMenuShareWeibo({
                    title: shareTitle,
                    desc: shareDesc,
                    link: window.location.href,
                    imgUrl: shareImg
                });
                wx.onMenuShareQZone({
                    title: shareTitle,
                    desc: shareDesc,
                    link: window.location.href,
                    imgUrl: shareImg
                });

            });

        }

    }


    WxShare2.init({ 'shareTitle': "这个是分享的标题", 'shareImg': 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png', 'shareDesc': '咦，这个描述，你看到了吗？' });





// $ (function(){ 
// //获取本页面连接，生成签名需要 
// var url =location.href.split('#')[0]; 
// $.ajax({ 
// url: "你的域名/weixin/sign?url="+encodeURIComponent(url), //你获取签名的接口 
// type: "GET", 
// async:true, 
// cache: false, 
// dataType: "json", 
// success: function(data){ 
// var da=data; 
// console.log(da.data.signature); 
// wx.config({ 
// debug: true, //调试模式 
// appId: 'wx97acfdc52e5239ef', 
// timestamp:da.data.timestamp, 
// nonceStr:da.data.nonceStr, 
// signature:da.data.signature, 
// jsApiList: [ 
// 'onMenuShareTimeline', 
// 'onMenuShareAppMessage'] 
// }); 
// }, 
// error: function() { 
// console.log('ajax request failed!!!!'); 
// return; 
// } 
// }); 
// wx.ready(function () { 
// // wx.checkJsApi({ 
// // jsApiList: [ 
// // 'onMenuShareTimeline', 
// // 'onMenuShareAppMessage' 
// // ], 
// // success: function (res) { 
// // console.log(res.errMsg); 
// // } 
// // }); 
// // 
// var shareData = { 
// title: "资讯消息", 
// desc: sharename, 
// link: url, 
// imgUrl: shareimg 
// }; 
// wx.onMenuShareAppMessage(shareData); 
// wx.onMenuShareTimeline(shareData); 
// }); 
// wx.error(function (res) { 
// console.log(res.errMsg+"错误信息"); 
// }); 
// });















</script>

</html>