
let wxShare = {
    access_token: "",
    config: {
        debug: false,
        appId: "",
        timestamp: Math.ceil(new Date().getTime() / 1000).toString(),
        nonceStr: getRandom(),
        signature: "",
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ]
    },
    init: function (shareData) {
        if (!wx) {
            alert("微信接口调用失败");
            return false;
        }

        var that = this;
        debug.log('开始调用')
        axios.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET").then((data) => {
            debug.log(data, '调用数据')
            // if(data.returncode===1){
            //     return data.message;
            // }
            // call(data)
            alert(data, 'data')
        }).catch((res) => {

            debug.log('调用失败')
            alert('diaoyongshibai')
        });


        // this.wx_get_appid(function (data) {

        //     that.config.appId = data[0];
        //     that.wx_get_access_token(function (data) {
        //         that.access_token = data[0];
        //         that.wx_get_sign(function (data) {
        //             console.log(that.config,'that.config')
        //             that.config.signature = data[0];
        //             that.initWx(shareData);
        //         });
        //     });
        // });
    },
    wx_get_appid: function (call) {
        axios.get("/users/common/wx/appid").then((data) => {
            if (data.returncode === 1) {
                return data.message;
            }
            call(data)
        });

    },
    wx_get_access_token: function (call) {
        axios.get("/users/common/wx/js-token").then((data) => {
            if (data.returncode === 1) {
                return data.message;
            }
            call(data)
        });
    },
    wx_get_sign: function (call) {
        axios.post("/users/common/wx/sign", {
            "noncestr": this.config.nonceStr,
            "jsapiTicket": this.access_token,
            "timestamp": this.config.timestamp,
            "url": window.location.href
        }).then((res) => {
            if (res.returncode === 1) {
                return res.message;
            }
            call(res);
        })
    },
    initWx: function (shareData, call, errorCall) {
        wx.config(wxShare.config);
        var shareTitle = shareData.shareTitle;
        var shareImg = shareData.shareImg;
        var shareDesc = shareData.shareDesc;
        wx.ready(function () {
            //alert('微信 ready');
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
        wx.error(function (res) {
            errorCall && errorCall();
        });
    },
    redir: function () {
        let location = window.location;
        if (location.search.indexOf("from=singlemessage") > 0) {
            window.location = location.origin + '/' + location.hash;
        }
    }
};
function getRandom() {
    var random = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        random += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) random += "";
    }
    return random;
}

//初始化
//wxShare.init({'shareTitle':"这个是分享的标题",'shareImg':'http://www.shoelives.com/assets/img/view4_item_left.jpg','shareDesc':'咦，这个描述，你看到了吗？'});
