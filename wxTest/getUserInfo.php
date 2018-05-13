<?php
if (isset($_GET['code'])) {
    //print_r($_SERVER['SCRIPT_NAME']);
    $res = getAccessToken($_GET['code']);
    //3333
    $thirdData = refreshToken($res['refresh_token']);

    //4 (sns)
    getUserInfo($thirdData['access_token'], $thirdData['openid']);
} else {
    $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83f2773ff212dde3&redirect_uri=http://mda2222.com/wxTest/getUserInfo.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    header('Location: ' . $url);
}
print_r($_GET);
function getAccessToken($code)
{
    $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx83f2773ff212dde3&secret=e9d4406f4f0eb1e23b8a6bce2cda4c91&code=' . $code . '&grant_type=authorization_code';
    $res = curl_request($url);
   // print_r($res);
    return json_decode($res, true);

}
//第三步获取刷新access_token
function refreshToken($token)
{
    $url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx83f2773ff212dde3&grant_type=refresh_token&refresh_token=' . $token;
    $res = curl_request($url);

    return json_decode($res, true);

}
//4
function getUserInfo($accessToken, $openid)
{
    $url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$accessToken.'&openid='.$openid.'&lang=zh_CN';
    $res = curl_request($url);
    print_r($res);
    return json_decode($res, true);
}






//参数1：访问的URL，参数2：post数据(不填则为GET)，参数3：提交的$cookies,参数4：是否返回$cookies
function curl_request($url, $post = '', $cookie = '', $returnCookie = 0)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
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