## 统一支付平台接口协议{ali|wx|union|icbc}



**apay.trade.pay.micro.(*)**
外部商户APP唤起对应SDK创建订单并支付

***

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
|auth_code|String|是|50|授权码|1238234717237834|

***

**公共响应参数**  
|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|code|String|是|10|网关返回码|200|
|message|String|否|50|异常返回描述|请求参数biz_content不合法|
|data|JSON|是| |请求返回的业务数据|{"XXX":"XXX"}|
|success|Boolean|是|10|请求是否成功|true|

***

**响应参数**  
|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|[aliPaymentResp](#aliPaymentResp响应参数)|JSON|否|支付宝app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|[wxPaymentResp](#wxPaymentResp响应参数)|JSON|否|微信app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|unionPaymentResp|JSON|否|银联app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|
|icbcPaymentResp|JSON|否|工行app支付方式需要的请求参数|{"out_trade_no":"xxx","xxx":"https://xxx/xxxxx"}|

***

**aliPaymentResp响应参数**  
支付宝付款码支付方式返回参数  

|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|out_trade_no|String|是|平台订单号|YYa788esdf4540aea5ab3cc53fd622|
|trade_no|String|是|支付宝订单号|2020060822001487431434007423|
|trade_status|String|是|交易状态, 1,交易成功,2,代付款,3,已关闭,4,交易结束|1|

***


**wxPaymentResp响应参数**  
微信付款码支付方式返回参数, 仅在支付成功时返回下列参数  

> 当错误码`code=20011`时, 表示等待用户输入支付密码, 稍后通过订单查询, 查询结果  

|参数|类型|是否必填|描述|示例值|
|:-------|:-------:|:-----:|:------|:-----:|
|out_trade_no|String|是|平台订单号|1217752501201407033233368018|
|transaction_id|String|是|微信订单号|1217752501201407033233368018|
|trade_type|String|是|交易类型|固定值:MICROPAY|
|time_end|String|是|支付完成时间|20141030133525|
|trade_state|String|是|支付状态,1,支付成功|1|

> 对于公共请求参数`method`方法进行说明，根据方法区分对应的支付机构和支付类型|apay.trade.pay.micro.wx|  

|参数|类型|是否必填|描述|
|:-------|:-------:|:-----:|:-----------:|
|apay.trade.pay.app.wx|String|是|30|请求的方法, 根据方法区分对应的支付机构和支付类型,`micro`表示付款码支付，`wx`表示付款码微信支付|
|apay.trade.pay.app.ali|String|是|30|请求的方法, 根据方法区分对应的支付机构和支付类型,`micro`表示付款码支付，`ali`表示付款码支付宝支付|




