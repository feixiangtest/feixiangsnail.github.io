
## 1. RSA和非对称加密
***
#### 1.1 非对称加密
大家都知道对称加密算法在加密和解密时使用的是同一个秘钥，加解密双方必须使用同一个密钥才能进行正常的沟通。而非对称加密则不然，非对称加密算法需要两个密钥来进行加密和解密，分别是公钥和私钥。  

需要注意的一点，这个公钥和私钥必须是一对的，如果用公钥对数据进行加密，那么只有使用对应的私钥才能解密，反之亦然。由于加密和解密使用的是两个不同的密钥，因此，这种算法叫做非对称加密算法。  

**工作过程**  

如下图，甲乙之间使用非对称加密的方式传输数据。
* **乙方生成一对密钥（公钥和私钥）并将公钥向其它方公开；**
* **得到该公钥的甲方使用该密钥对机密信息进行加密后再发送给乙方；**
* **乙方再用自己保存的另一把专用密钥（私钥）对加密后的信息进行解密；**
* **乙方只能用其专用密钥（私钥）解密由对应的公钥加密后的信息；**
* **乙方生成一对密钥（公钥和私钥）并将公钥向其它方公开；**
* **在传输过程中，即使攻击者截获了传输的密文，并得到了乙的公钥，也无法破解密文，因为只有乙的私钥才能解密密文；**
<br>
<br>
<img src="./resources/images/keyprocess.png" width="70%">

#### 1.2 RSA
在 1978 年的时候，RSA就已经出现了，它是第一个既能用于数据加密也能用于数字签名的算法。它易于理解和操作，也很流行。其原理就如上面的工作过程所述。
<br>
 RSA 算法基于一个十分简单的数论事实：将两个大素数相乘十分容易，但是想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。
 <br>
 <br>

## 2.生成RSA秘钥
***
#### 2.1利用 OpenSSL 工具生成RSA秘钥
也可以使用 <a href="https://www.openssl.org/source/">OpenSSL</a> 工具命令生成  
首先进入OpenSSL工具，再输入以下命令。
```shell
OpenSSL> genrsa -out rsa_private_key.pem   2048  #生成私钥 
OpenSSL> pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt -out rsa_private_key_pkcs8.pem 
#Java开发者需要将私钥转换成PKCS8格式 
OpenSSL> rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem #生成公钥 
OpenSSL> exit #退出OpenSSL程序
```
经过以上步骤，开发者可以在当前文件夹中（OpenSSL运行文件夹），看到rsa_private_key.pem（RSA私钥）、rsa_private_key_pkcs8.pem（pkcs8格式RSA私钥）和rsa_public_key.pem（对应RSA公钥）3个文件。开发者将私钥保留，将公钥提交给支付宝网关，用于验证签名。以下为私钥文件和公钥文件示例。  
> 注意：对于使用Java的开发者，将pkcs8在console中输出的私钥去除头尾、换行和空格，作为开发者私钥，对于.NET和PHP的开发者来说，无需进行pkcs8命令行操作。    

标准的私钥文件示例（PHP、.NET使用）  
```shell
 -----BEGIN RSA PRIVATE KEY-----
 MIICXQIBAAKBgQC+L0rfjLl3neHleNMOsYTW8r0QXZ5RVb2p/vvY3fJNNugvJ7lo4+fdBz+LN4mDxTz4MTOhi5e2yeAqx+v3nKpNmPzC5LmDjhHZURhwbqFtIpZD51mOfno2c3MDwlrsVi6mTypbNu4uaQzw/TOpwufSLWF7k6p2pLoVmmqJzQiD0QIDAQABAoGAakB1risquv9D4zX7hCv9MTFwGyKSfpJOYhkIjwKAik7wrNeeqFEbisqv35FpjGq3Q1oJpGkem4pxaLVEyZOHONefZ9MGVChT/MNH5b0FJYWl392RZy8KCdq376Vt4gKVlABvaV1DkapL+nLh7LMo/bENudARsxD55IGObMU19lkCQQDwHmzWPMHfc3kdY6AqiLrOss+MVIAhQqZOHhDe0aW2gZtwiWeYK1wB/fRxJ5esk1sScOWgzvCN/oGJLhU3kipHAkEAysNoSdG2oWADxlIt4W9kUiiiqNgimHGMHPwp4JMxupHMTm7D9XtGUIiDijZxunHv3kvktNfWj3Yji0661zHVJwJBAM8TDf077F4NsVc9AXVs8N0sq3xzqwQD/HPFzfq6hdR8tVY5yRMb4X7+SX4EDPORKKsgnYcur5lk8MUi7r072iUCQQC8xQvUne+fcdpRyrR4StJlQvucogwjTKMbYRBDygXkIlTJOIorgudFlrKP/HwJDoY4uQNl8gQJb/1LdrKwIe7FAkBl0TNtfodGrDXBHwBgtN/t3pyi+sz7OpJdUklKE7zMSBuLd1E3O4JMzvWP9wEE7JDb+brjgK4/cxxUHUTkk592  
  -----END RSA PRIVATE KEY-----  
  ```  
  PKCS8处理后的私钥文件示例（Java使用）  
  ```shell
 -----BEGIN RSA PRIVATE KEY-----
 MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAN0yqPkLXlnhM+2H/57aHsYHaHXazr9pFQun907TMvmbR04wHChVsKVgGUF1hC0FN9hfeYT5v2SXg1WJSg2tSgk7F29SpsF0I36oSLCIszxdu7ClO7c22mxEVuCjmYpJdqb6XweAZzv4Is661jXP4PdrCTHRdVTU5zR9xUByiLSVAgMBAAECgYEAhznORRonHylm9oKaygEsqQGkYdBXbnsOS6busLi6xA+iovEUdbAVIrTCG9t854z2HAgaISoRUKyztJoOtJfI1wJaQU+XL+U3JIh4jmNx/k5UzJijfvfpT7Cv3ueMtqyAGBJrkLvXjiS7O5ylaCGuB0Qz711bWGkRrVoosPM3N6ECQQD8hVQUgnHEVHZYtvFqfcoq2g/onPbSqyjdrRu35a7PvgDAZx69Mr/XggGNTgT3jJn7+2XmiGkHM1fd1Ob/3uAdAkEA4D7aE3ZgXG/PQqlm3VbE/+4MvNl8xhjqOkByBOY2ZFfWKhlRziLEPSSAh16xEJ79WgY9iti+guLRAMravGrs2QJBAOmKWYeaWKNNxiIoF7/4VDgrcpkcSf3uRB44UjFSn8kLnWBUPo6WV+x1FQBdjqRviZ4NFGIP+KqrJnFHzNgJhVUCQFzCAukMDV4PLfeQJSmna8PFz2UKva8fvTutTryyEYu+PauaX5laDjyQbc4RIEMU0Q29CRX3BA8WDYg7YPGRdTkCQQCG+pjU2FB17ZLuKRlKEdtXNV6zQFTmFc1TKhlsDTtCkWs/xwkoCfZKstuV3Uc5J4BNJDkQOGm38pDRPcUDUh2/
  -----END RSA PRIVATE KEY-----  
  ```   
  公钥文件示例
```shell
 -----BEGIN RSA PRIVATE KEY-----
 MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQWiDVZ7XYxa4CQsZoB3n7bfxLDkeGKjyQPt2FUtm4TWX9OYrd523iw6UUqnQ+Evfw88JgRnhyXadp+vnPKP7unormYQAfsM/CxzrfMoVdtwSiGtIJB4pfyRXjA+KL8nIa2hdQy5nLfgPVGZN4WidfUY/QpkddCVXnZ4bAUaQjXQIDAQAB
  -----END RSA PRIVATE KEY-----  
```   
#### 2.2 使用蚂蚁金服-支付宝提供的一键生成工具（内附使用说明）
* Windows:  <a href="https://os.alipayobjects.com/download/secret_key_tools_RSA_win.zip">下载</a>
* Mac_OSX: <a href="https://os.alipayobjects.com/download/secret_key_tools_RSA_macosx.zip">下载</a>  
<br>  

解压打开文件夹，直接运行“支付宝RAS密钥生成器SHAwithRSA1024_V1.0.bat”（WINDOWS）或“SHAwithRSA1024_V1.0.command”（MACOSX），点击“生成RSA密钥”，会自动生成公私钥，然后点击“打开文件位置”，即可找到工具自动生成的密钥。

> 特别说明：本平台暂只支持RSA1且秘钥长度为2048位的秘钥


