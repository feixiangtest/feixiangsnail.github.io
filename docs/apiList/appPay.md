## 统一支付平台接口协议{ali|wx|union|icbc}


**apay.trade.pay.app.（*）**  
外部商户APP唤起对应SDK创建订单并支付


**公共请求参数**  

|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|platform_app_id|String|是|30|分配给开发者的应用ID|kjabkjsdbfkjdf|
|method|String|是|30|请求的方法, 根据方法区分对应的支付机构和支付类型|apay.trade.pay.micro.wx|
|format|String|是|10|请求格式, 固定值: JSON|JSON|
|charset|String|是|10|字符集, 固定值: UTF-8|UTF-8|
|version|String|是|10|版本号, 固定值: V1.0|V1.0|
|timestamp|String|是|18|发送请求时间戳, 格式'yyyy-MM-dd HH:mm:ss'|2020-06-01 00:00:00|
|return_url|String|否|50|同步返回地址,HTTP/HTTPS开头字符串|http://xxx/returnUrl|
|notify_url|String|否|50|服务器主动通知商户服务器里指定的页面http/https路径|http://xxx/notifyUrl|
|biz_content|String|是| |业务数据内容, 由公钥加密的json数据,长度不限|{"xxx":"xxx"}|
|sign_type|String|是|10|签名方式, 固定值 RSA|RSA|
|sign|String|是|50|由私钥签名的数据|kljabnlkjnkljdfs|

***

**请求参数**  
|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|subject|String|是|30|订单主题|测试订单主题|
|total_amount|String|是|14|订单总金额，单位为分，取值范围[1,10000000000]|100|

***

**公共响应参数**  
|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|code|String|是|10|网关返回码|200|
|message|String|否|50|异常返回描述|请求参数biz_content不合法|
|[data](#响应参数)|JSON|是|-|请求返回的业务数据|{"XXX":"XXX"}|
|success|Boolean|是|10|请求是否成功|true|

***

**响应参数**  
根据不同的请求方式返回不同类型的数据, 对应的返回参数用于对应支付方式SDK请求参数  

|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|[aliPaymentResp](#aliPaymentResp响应参数)|JSON|否|支付宝app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|[wxPaymentResp](#wxPaymentResp响应参数)|JSON|否|微信app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|unionPaymentResp|JSON|否|银联app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|icbcPaymentResp|JSON|否|工行app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|

***

**aliPaymentResp响应参数**  
支付宝APP支付方式返回参数  

|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|app_request_content|String|是|支付宝手机SDK直接调起支付的参数|alipay_sdk=alipay-sdk-java-dynamicVersionNo&xxx=xxx|

***

**wxPaymentResp响应参数**  
微信APP支付方式返回参数  

|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|app_request_content|JSON|是|微信手机SDK调用支付参数|{"package":"Sign=WXPay","appid":"xxxxx"}|

***

> 对于公共请求参数`method`方法进行说明，根据方法区分对应的支付机构和支付类型|apay.trade.pay.micro.wx|  

|参数|类型|是否必填|描述|
|:-------|:-------:|:-----:|:-----------:|
|apay.trade.pay.micro.wx|String|是|30|请求的方法, 根据方法区分对应的支付机构和支付类型,`micro`表示付款码支付，`wx`表示付款码微信支付|
|apay.trade.pay.micro.ali|String|是|30|请求的方法, 根据方法区分对应的支付机构和支付类型,`micro`表示付款码支付，`ali`表示付款码支付宝支付|

***
**请求示例**  
```java  
    static Map<String, String> getCommonParamMap(String method, Map<String, String> bizContent) throws Exception {
        Map<String, String> beanMap = new HashMap<>();
        beanMap.put(Constant.PLATFORM_APP_ID, Constant.APP_ID_DEMO);
        beanMap.put(Constant.METHOD, method);
        beanMap.put(Constant.TIMESTAMP, getTimestamp());

        beanMap.put(Constant.FORMAT, Constant.DEFAULT_FORMAT);
        beanMap.put(Constant.CHARSET, Constant.DEFAULT_CHARSET);
        beanMap.put(Constant.VERSION, Constant.DEFAULT_VERSION);
        beanMap.put(Constant.SIGN_TYPE, Constant.DEFAULT_SIGN_TYPE);
        beanMap.put(Constant.BIZ_CONTENT, getEncryptedBizContent(bizContent));
        beanMap.put(Constant.SIGN, getSign(beanMap));
        return beanMap;
    }

    static String getSign(Map<String, String> map) throws Exception {
        String content = RsaKit.getSourceContent(map);
        return RsaKit.encryptByPrivateKey(content, Constant.appPrivateKey);
    }

    static String getTimestamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date());
    }

    static String getEncryptedBizContent(Map<String, String> map) throws Exception {
        String bizContent = JSON.toJSONString(map);
        return RsaKit.encryptByPublicKey(bizContent, Constant.serverPublicKey);
    }  
```
***
**请求参数示例**  
```java  
    {
    "charset": "UTF-8",
    "biz_content": "KcdStftPfuQqSpSY7nrz6TboSqzeN9VRPmArzoB5XvrzL9bKiOMIQKgUu6fRSgkeUCFhodg5OBep0HspibXz5QlhO8EGh
ful/iZxkP6i4m1h+GB66llSJ49s/MS5KgKDIj2mz9o9bKJlgQhyNzcNO8oabLk4u5aD3MIZIkoaVlM=",
    "method": "apay.trade.pay.app.ali",
    "format": "JSON",
    "sign": "ExiidnhyLbCVNy3Agb0vbwywa1NikG/JHGSDoVD0RXAkz37UKm0uwW9kinJMZsSz9yN0XI/KR4jxB1E2tUAIRwQRGYwEohU3TXtj
c1LoDzYb4O3U411s1d3QnwdB8pK9SSJ5blNAyWNNNX2762npakOShXctALPJG/7fG6Wtaak=",
    "platform_app_id": "12345678",
    "version": "V1.0",
    "sign_type": "RSA",
    "timestamp": "2020-06-12 14:23:27"
}
```
***
**响应示例**  
```java  
    {
	"code":200,
	"data":{
		"aliPaymentResp":{
			"app_request_content":"alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2019050864414244
&biz_content=%7B%22out_trade_no%22%3A%22YYf87f905d9fab4d008a03828bd6177c%22%2C%22subject%22%3A%22%E6%B5%8B%E8%AF
%95Native%E6%94%AF%E4%BB%98%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=UTF-8
&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F62.234.131.111%3A9000%2Fapi%2FpayNotify%2FaliPay
&sign=TPEQEAdKnRhxz639%2FcIfz2rtKE7fcxp7VSAZ49JYDDcZyTdDyduPODp4v%2F3A5uAlR63k3inKzJfIFo3Fd5K53ORT7QMdsjP7HmEudxt
Va4KJL%2BeQtJjuZ5BboCU2Jw%2FPXXydo2V6T5%2FXyz0yYmSJMhcbCewpsp4PGk8XA7w5pAT3xUAo9ZLYN%2BLvhXoXIgNXKMyJLdr9Qy1%2FI11
TuZ3tZofBdcfzCHEOEYdSN8G1ELTGuQxImUHuejFoolF8ThyuuBsOBJGuc2WJ7ijM8G0oUOAj%2FODMPJHeFRoXt5ieqbcIxLaXoJgwr7uaDSFp9nSX
HddX%2FbjSp6OkYgtgOJZG9w%3D%3D&sign_type=RSA2&timestamp=2020-06-12+11%3A34%3A59&version=1.0"
		}
	},
	"success":true
}  
```
***
**异常示例**  
```java 
{
    "code": 400,
    "message": "【Method】参数不合法, 请检查后重试.",
    "success": false
} 
```





