# 统一支付平台接口接口入参规则
***
## 统一支付接口网管地址url
http://XXXX:XXXX/api/v1/gateway.do


## 公共请求参数

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

## 请求参数（app支付请求入参为例）
|参数|类型|是否必填|最大长度|描述|示例值|
|:-------|:-------:|:-----:|:------:|:------|:-----:|
|subject|String|是|30|订单主题|测试订单主题|
|total_amount|String|是|14|订单总金额，单位为分，取值范围[1,10000000000]|100|

例如：以APP支付为例进行统一支付接口入参的规则说明
  * <font color=#e96900>统一支付接口公共请求参数中需要针对biz_content（业务数据内容）进行公钥的加密处理，以json的格式进行传参;</font>
  * <font color=#e96900>业务数据内容 `biz_content` 的数据来源于请求参数部分;</font>
  * <font color=#e96900>需要对参数 `biz_content` 进行公钥加密,该公钥为平台提供,加密方法及加密方式将在对接时进行提供,如下代码示例; </font> 

### 代码示例
        ``` 
        Map<String, String> map = new HashMap<>();
        map.put(BIZ_PARAM_SUBJECT, "测试Native支付");
        map.put(BIZ_PARAM_TOTAL_AMOUNT, "1");
        ```
### 代码示例  
    ```
    Constant.serverPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCVTNFfYTKSrepy6gVTaD0O72Mo6LXtpQGpAAb4PXjuDb7KgEudZtnuBhB6GFZ+5uPPCyB8tiIAdYWP8dCmrKL+G5MQSe1Yj9QMdnirWVruf7tgf11vX0dui/o62kASyB1k7GL+y8HKh+ksz5DMq7/1rrd7RR8oQRirkHt3jiN6wIDAQAB";
    public static String getEncryptedBizContent(Map<String, String> map) throws Exception {
        String bizContent = JSON.toJSONString(map);
        return RsaKit.encryptByPublicKey(bizContent, Constant.serverPublicKey);
    }
    ```  

  > * <font color=#e96900>统一支付接口验签sign的验签规则;</font>    
    2.1、sign数据来源为公共参数除自身外所有参数的Map集合;  
    2.2、对sign的值集合进行将集合内非空参数值的参数按照参数名ASCII码从小到大排序（字典序）,使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。  
    2.3、对处理后的sign值进行数据的私钥签名处理，该私钥为客户端接入平台时保留的私钥;  

### 代码示例
1. 例如上述业务参数数`biz_content`据加密结果如下:  
``` biz_content = "Wluk+QZ1/4Kc5Fb7H22EisTO/N/IUFvXyrBWe3Sq3BkFgGpr/KW5vGLw9poKzQSIRhBqnCX8Efl2Wk4wvkbI2YHUSPHPFC3Z/fyN0rALzdTs+t+Hcx2h1vVP91G/sVUEnYHEN1FXt7Gy9qX47Zchw7Rl+KJ/gd7lVqCTuiqXqH8="; ```  
2. 根据sign签名规则进行sign的封装，对sign的值集合进行将集合内非空参数值的参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA，代码如下：  
``` stringA = "biz_content=Wluk+QZ1/4Kc5Fb7H22EisTO/N/IUFvXyrBWe3Sq3BkFgGpr/KW5vGLw9poKzQSIRhBqnCX8Efl2Wk4wvkbI2YHUSPHPFC3Z/fyN0rALzdTs+t+Hcx2h1vVP91G/sVUEnYHEN1FXt7Gy9qX47Zchw7Rl+KJ/gd7lVqCTuiqXqH8=&charset=UTF-8&format=JSON&method=apay.trade.pay.app.ali&notify_url=/aliPay/notifyUrl&platform_app_id=12345678&return_url=/aliPay/returnUrl&sign_type=RSA&timestamp=2020-06-23 17:57:13&version=V1.0";```  








