## 统一支付平台接口协议

**apay.trade.refund**  
统一支付平台退费接口  

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
|out_trade_no|String|是|64|平台订单号|YYa788esdf4540aea5ab3cc53fd622|

***

**公共响应参数**   
|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|code|String|是|10|网关返回码|200|
|message|String|否|50|异常返回描述|请求参数biz_content不合法|
|data|JSON|是| |请求返回的业务数据|{"XXX":"XXX"}|
|success|Boolean|是|10|请求是否成功|true|

