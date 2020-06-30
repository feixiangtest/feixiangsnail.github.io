## 1. 确定要传递的参数
***

####  1.1 确定编码格式
​			支付宝支持的编码格式只有UTF-8。如果客户是其他编码格式，建议转成UTF-8请求。

#### 1.2 这些参数怎么来的？

每个接口对应一个接口技术文档，文档中提到的请求参数，就是可以选择要传递的参数。详细可以见 [API列表](/apiList/payCode)。

#### 1.3 怎么确定这些参数？

- 基本参数	

  * app_id,method,format,charset,version,timestamp,biz_content这些属于基本公共参数，是必须要传递的参数。

- 业务参数

  - 在接口技术文档的'请求参数'列表中，不可空的参数是必须要传递的参数。

    

## 2.对业务参数进行加密

用查询接口为例，此接口需要biz_ordersn和trade_no两个参数，首先把这两个k-v参数转为json格式，如下

```json
{
"biz_ordersn": "201xxxx", 
"trade_no": "101xxxxx"
} 
```

接着对json进行RSA加密**（这里使用统一支付平台的公钥来加密）**,得到加密后的字符串"LWvIYr7A5nLyudp+6FjvB+hhmDxFgPLkNSjw6CTVgFO6"

## 3. 签名

还是以查询接口为例，将上面得到的加密后的字串"LWvIYr7A5nLyudp+6FjvB+hhmDxFgPLkNSjw6CTVgFO6"赋值给biz_content,接着去除sign,sign_type两个参数和所有为空的参数后，对这些参数进行字典序排序。排序后，将这些参数以'key=value&'的http参数形式组成一个字符串，如下：

```
app_id=HMB_APP0001&biz_content=LWvIYr7A5nLyudp+6FjvB+hhmDxFgPLkNSjw6CTVgFO6&charset=UTF-8&format=JSON&method=biginspay.trade.query&timestamp=2017-07-10 12:12:12&version=1.0
```

接着对上面的字符串进行RSA签名**（这里使用你自己的私钥来签名）**,得到签名后的字符串sign="EMaEr9QYusO7KkU5gDWIQmIzk6kAlzjY0Gj4VIscoiGP4LwYbJSwSYlfrMal2v6BA0WUccIcTKumexPgxzAkj="

将结果发送到统一支付平台

最后将所有的公共请求参数和sign,signtype，以Post方式发送Http请求到海绵保支付平台。

```
app_id = HMB_APP0001 
bContent = LWvIYr7A5nLyudp+6FjvB+hhmDxFgPLkNSjw6CTVgFO6 
charset = UTF-8 
format = JSON 
method = biginspay.trade.query 
sign_type = RSA 
timestamp = 2017-07-10 12:12:12 
version = 1.0.0 
sign = EMaEr9QYusO7KkU5gDWIQmIzk6kAlzjY0Gj4VIscoiGP4LwYbJSwSYlfrMal2v6BA0WUccIcTKumexPgxzAkj=
```

## 4. 相关加密和签名代码

**JAVA**

```java
import java.io.ByteArrayOutputStream;
import java.security.Key;
import java.security.KeyFactory;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class RsaUtils {

  /**
   * RSA加密方法
      *
   * @param data 待加密数据
   * @param publicKey 公钥字符串
   * @throws Exception
      */
    public static String encryptByPublicKey(byte[] data, String publicKey)
      throws Exception {

    byte[] keyBytes = Base64.decode(publicKey);
    X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(keyBytes);
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    Key publicK = keyFactory.generatePublic(x509KeySpec);
    // 对数据加密
    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
    cipher.init(Cipher.ENCRYPT_MODE, publicK);
    int inputLen = data.length;
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    int offSet = 0;
    for(int i = 0; inputLen - offSet > 0; offSet = i * 117) {
      byte[] cache;
      if(inputLen - offSet > 117) {
        cache = cipher.doFinal(data, offSet, 117);
      } else {
        cache = cipher.doFinal(data, offSet, inputLen - offSet);
      }
    
      out.write(cache, 0, cache.length);
      ++i;
    }
    
    byte[] encryptedData = out.toByteArray();
    out.close();
    return Base64.encode(encryptedData);
  }

  /**
   * RSA解密方法
      *
   * @param encryptedString 待解密数据
   * @param privateKey 私钥字符串
   * @throws Exception
      */
    public static String decryptByPrivateKey(String encryptedString, String privateKey)
      throws Exception {

    byte[] encryptedData = Base64.decode(encryptedString);
    byte[] keyBytes = Base64.decode(privateKey);
    PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    Key privateK = keyFactory.generatePrivate(pkcs8KeySpec);
    Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
    cipher.init(Cipher.DECRYPT_MODE, privateK);
    int inputLen = encryptedData.length;
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    int offSet = 0;
    for(int i = 0; inputLen - offSet > 0; offSet = i * 128) {
      byte[] cache;
      if(inputLen - offSet > 128) {
        cache = cipher.doFinal(encryptedData, offSet, 128);
      } else {
        cache = cipher.doFinal(encryptedData, offSet, inputLen - offSet);
      }
      out.write(cache, 0, cache.length);
      ++i;
    }
    byte[] decryptedData = out.toByteArray();
    out.close();
    return new String(decryptedData, "UTF-8");
  }

   /**
   * 数字签名算法
      */
    public static final String RSA = "SHA1withRSA";
    public static final String RSA2 = "SHA256withRSA";
    /**
   * 非对称加密密钥算法
      */
    private static final String KEY_ALGORITHM = "RSA";
    /**
   * 编码
      */
    private static final String CHARSET = "UTF-8";

  /**
   * RSA签名
      *
   * @param content 待签名数据
   * @param privateKey 商户私钥 PKCS8格式
   * @param encode 字符集编码
   * @return 签名值
      */
    public static String sign(String content, String privateKey, String rsaType, String encode) {

    try {
      PKCS8EncodedKeySpec priPKCS8 = new PKCS8EncodedKeySpec(Base64.decode(privateKey));
      KeyFactory keyf = KeyFactory.getInstance(KEY_ALGORITHM);
      PrivateKey priKey = keyf.generatePrivate(priPKCS8);
      Signature signature = Signature.getInstance(rsaType);
      signature.initSign(priKey);
      signature.update(content.getBytes(encode));
      byte[] signed = signature.sign();
      return Base64.encode(signed);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static String signWithRSA(String content, String privateKey, String encode) {
    return sign(content, privateKey, RSA, StringUtils.isNotBlank(encode) ? encode : CHARSET);
  }

  public static String signWithRSA(String content, String privateKey) {
    return sign(content, privateKey, RSA, CHARSET);
  }

  public static String signWithRSA2(String content, String privateKey, String encode) {
    return sign(content, privateKey, RSA2, StringUtils.isNotBlank(encode) ? encode : CHARSET);
  }

  public static String signWithRSA2(String content, String privateKey) {
    return sign(content, privateKey, RSA2, CHARSET);
  }

  /**
   * RSA验签名检查
      *
   * @param content 待签名数据
   * @param sign 签名值
   * @param publicKey 分配给开发商公钥
   * @param charset 字符集编码
   * @return 布尔值
      */
    public static boolean doCheck(String content, String sign, String publicKey, String charset) {

    try {
      KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
      byte[] encodedKey = Base64.decode(publicKey);
      PublicKey pubKey = keyFactory.generatePublic(new X509EncodedKeySpec(encodedKey));
      //
      java.security.Signature signature = java.security.Signature.getInstance(RSA);
      //
      signature.initVerify(pubKey);
      if (StringUtils.isEmpty(charset)) {
        signature.update(content.getBytes());
      } else {
        signature.update(content.getBytes(charset));
      }
      //
      boolean bverify = signature.verify(Base64.decode(sign));
      return bverify;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return false;
  }

  public static String getSignCheckContent(Map<String, String> params) {
    if (params == null) {
      return null;
    } else {
      params.remove("sign");
      params.remove("sign_type");
      StringBuffer content = new StringBuffer();
      List<String> keys = new ArrayList(params.keySet());
      Collections.sort(keys);
      for (int i = 0; i < keys.size(); ++i) {
        String key = keys.get(i);
        String value = params.get(key);
        content.append((i == 0 ? "" : "&") + key + "=" + value);
      }
      return content.toString();
    }
  }

  public static boolean doCheck(String content, String sign, String publicKey) {
    return doCheck(content, sign, publicKey, CHARSET);
  }
}
```

**PHP**

```php
final class Rsa_Util{
	 /**
	  * Rsa 进行签名
	  * @param  $params  post公共参数(array)
	  * @param  $myPrvKey 签名使用的自己的Rsa私钥
	  * @return 签名字符串
	  */
    private static function __rsaSign(array $params, $myPrvKey)
    {
    	//序列化
    	$paramsStr = self::buildString($params);
        openssl_sign($paramsStr, $sign, $myPrvKey);
        return base64_encode($sign);
    }
	
	/**
	  *  Rsa 进行验签
	  * @param  $params  post公共参数(array)
	  * @param  $myPrvKey rsa验签使用的公钥
	  * @return 验证签名的结果
	  */
    private static function __rsaVerify(array $params, $sign, $hisPubKey)
    {
        unset($params['sign'], $params['sign_type']);
        // 序列化
        $paramsStr = self::buildString($params);
        return openssl_verify($paramsStr, base64_decode($sign), $hisPubKey);
    }
		
	/**
	  *   Rsa 对字符串加密
	  * @param  $source  待加密的字符串
	  * @param  $type ’public‘
	  *	@param  $key 使用公钥来进行加密
	  * @return 加密后的字符串
	  */
     private static function __rsaEncrypt($source, $type, $key)
    {
        $maxLength = 117;
        $output = '';

        while ($source) {
            $input = substr($source, 0, $maxLength);
            $source = substr($source, $maxLength);
            if ($type == 'private') {
                $ok = openssl_private_encrypt($input, $encrypted, $key);
            } else {
                $ok = openssl_public_encrypt($input, $encrypted, $key);
            }
            $output .= $encrypted;
        }

        return $output;
    }

	/**
	  *   Rsa 对字符串解密
	  * @param  $source  待解密的字符串
	  * @param  $type ’public‘
	  *	@param  $key 使用私钥来进行解密
	  * @return 解密后的字符串
	  */
    private static function __rsaDecrypt($source, $type, $key)
    {
        $maxLength = 128;
        $output = '';

        while ($source) {
            $input = substr($source, 0, $maxLength);
            $source = substr($source, $maxLength);
            if ($type == 'private') {
                $ok = openssl_private_decrypt($input, $out, $key);
            } else {
                $ok = openssl_public_decrypt($input, $out, $key);
            }
            $output.=$out;
        }

        return $output;
    }

    public static function buildPubKey($pubKeyStr)
    {
        $KEY_PREFIX = "-----BEGIN PUBLIC KEY-----\n";
        $KEY_SUFFIX = '-----END PUBLIC KEY-----';

        return $KEY_PREFIX . chunk_split($pubKeyStr, 64, "\n") . $KEY_SUFFIX;
    }

    // 签名并拼接请求参数字符串
    // 对数组里的键进行从a到z的顺序排序，若遇到相同字母，则看第二个字母，以此类推
    // 排序完成后，再把所有键值对用“&”字符连接起来
    public static function buildString(array $params)
    {
        // 键名升序
        ksort($params);

        $strs = array();

        foreach ($params as $key => $value) {
            $strs[] = $key . '=' . $value;
        }

        // 拼接待签名字符串
        $paramStr = implode('&', $strs);

        // 返回最终完整参数串
        return $paramStr;
    }
}
```

