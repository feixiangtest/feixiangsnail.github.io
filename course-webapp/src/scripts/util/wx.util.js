require('../lib/jweixin-1.0.0.js');

wx.config({
	debug: false,
	appId: "{$signPackage['appId']}",
	timestamp: '{$signPackage["timestamp"]}',
	nonceStr: '{$signPackage["nonceStr"]}',
	signature: '{$signPackage["signature"]}',
	jsApiList: [
		// 所有要调用的 API 都要加到这个列表中
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'getNetworkType',
		'hideOptionMenu',
		'showOptionMenu',
		'hideMenuItems',
		'showMenuItems',
		'hideAllNonBaseMenuItem',
		'showAllNonBaseMenuItem',
		'closeWindow',
		'scanQRCode'
	]
});
wx.ready(function () {

});
