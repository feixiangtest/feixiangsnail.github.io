<?php

getUserData();
function getUserData()
{
    if (isset($_GET['code'])) {
        //获取accessToken
        $res = getAccessToken($_GET['code']);
        //如果accessToken失效，再刷新获取.
        if (!checkAccessToken($res['access_token'], $res['openid'])) {
            $res = refreshToken($res['refresh_token']);
        }
        $data = getUserInfo($res['access_token'], $res['openid']); 
         print_r($data);
        storeData($data);
        setcookie('wxUserInfo',$data);
       // header('Location: http://mda2222.com/wxTest/index.html');
    } else {

        //获取code值
        $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?

appid=wx83f2773ff212dde3&redirect_uri=http://mda2222.com/getUserInfo.php&response_type=code&scope=s

nsapi_userinfo&state=STATE#wechat_redirect';


//https://open.weixin.qq.com/connect/oauth2/authorize?

appid=wx83f2773ff212dde3&redirect_uri=http://172.104.32.98:8001/code&response_type=code&scope=snsap

i_userinfo&state=STATE#wechat_redirect
        header('Location: ' . $url);
    }

}







function storeData($data){

$data = json_decode($data);
$openid = $data->openid;

    
$con = mysqli_connect('172.104.32.98','root','asaiw48!skdhw1223','chess',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM wechat_user WHERE openid = '$openid' ";

$result = mysqli_query($con,$sql);

if($result){
print_r($result);
}
else{
INSERT INTO chess (nickname, sex,province,city,country,headimgurl) VALUES ('Wilson', 'Champs-Elysees')
}





    if (!$con)
      {
        echo '连接数据库失败';
      die('Could not connect: ' . mysql_error());
      }
      else{
        echo '成功连接数据库';
      }
}











//获取accessToken
function getAccessToken($code)
{
    $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?

appid=wx83f2773ff212dde3&secret=e9d4406f4f0eb1e23b8a6bce2cda4c91&code=' . $code . 

'&grant_type=authorization_code';
    $res = curl_request($url);
    return json_decode($res, true);

}
//获取刷新access_token
function refreshToken($token)
{
    $url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?

appid=wx83f2773ff212dde3&grant_type=refresh_token&refresh_token=' . $token;
    $res = curl_request($url);

    return json_decode($res, true);

}
//获取用户信息
function getUserInfo($accessToken, $openid)
{
    $url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $accessToken . '&openid=' . 

$openid . '&lang=zh_CN';
    $res = curl_request($url);

    return $res;
}

//附加判断是否过期
function checkAccessToken($token, $open)
{
    $url = 'https://api.weixin.qq.com/sns/auth?access_token=' . $token . '&openid=' . $open;
    $res = curl_request($url);
    
    $data = json_decode($res, true);
    if (isset($data['errmsg']) && $data['errmsg'] == 'ok') {
        return true;
    } else {
        return false;
    }
}




//参数1：访问的URL，参数2：post数据(不填则为GET)，参数3：提交的$cookies,参数4：是否返回$cookies
function curl_request($url, $post = '', $cookie = '', $returnCookie = 0)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; 

Trident/6.0)');
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
    curl_setopt($curl, CURLOPT_REFERER, "http://XXX");
    if ($post) {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post));
    }
    if ($cookie) {
        curl_setopt($curl, CURLOPT_COOKIE, $cookie);
    }
    curl_setopt($curl, CURLOPT_HEADER, $returnCookie);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    if (curl_errno($curl)) {
        return curl_error($curl);
    }
    curl_close($curl);
    if ($returnCookie) {
        list($header, $body) = explode("\r\n\r\n", $data, 2);
        preg_match_all("/Set\-Cookie:([^;]*);/", $header, $matches);
        $info['cookie'] = substr($matches[1][0], 1);
        $info['content'] = $body;
        return $info;
    } else {
        return $data;
    }
}
?>