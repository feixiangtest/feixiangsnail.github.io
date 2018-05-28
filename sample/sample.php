<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx83f2773ff212dde3", "e9d4406f4f0eb1e23b8a6bce2cda4c91");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
</head>
<body>
  哈喽微信分享
</body>
<script>
  
  // wx.config({
  //   debug: true,
  //   appId: "wx83f2773ff212dde3",
  //   timestamp: Math.ceil(new Date().getTime() / 1000).toString(),
  //   nonceStr: getRandom(),
  //   signature:'<?php echo $signPackage["signature"];?>',
  //   jsApiList: [
      
  //     'onMenuShareTimeline',
  //     'onMenuShareAppMessage',
  //     'onMenuShareQQ',
  //     'onMenuShareWeibo',
  //     'onMenuShareQZone'
  //   ]
  // });


   wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
            'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  });


function getRandom(){
    var random = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        random += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) random += "";
    }
    return random;
}

  function share(shareData){
    
  wx.ready(function () {
    // 在这里调用 API
        var shareTitle = shareData.shareTitle;
        var shareImg = shareData.shareImg;
        var shareDesc=shareData.shareDesc;

         
            wx.onMenuShareTimeline({
                title:shareTitle,
                link: window.location.href,
                imgUrl: shareImg
            });
            wx.onMenuShareAppMessage({
                title:shareTitle,
                desc: shareDesc,
                link: window.location.href,
                imgUrl: shareImg,
                type: 'link'
            });
            //分享到QQ
            wx.onMenuShareQQ({
                title:shareTitle,
                desc: shareDesc,
                link: window.location.href,
                imgUrl: shareImg
            });
            wx.onMenuShareWeibo({
                title:shareTitle,
                desc: shareDesc,
                link: window.location.href,
                imgUrl: shareImg
            });
            wx.onMenuShareQZone({
                title:shareTitle,
                desc: shareDesc,
                link: window.location.href,
                imgUrl: shareImg
            });

  });
 }

share({'shareTitle':"这个是分享的标题",'shareImg':'https://www.baidu.com/','shareDesc':'咦，这个描述，你看到了吗？'});








</script>
</html>
