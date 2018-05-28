<?php
if(isset($_GET['session_id'])){
	session_id($_GET['session_id']);
}

session_start();
session_id();
$user=[
	"UserName"=>"测试用户",
	"UserImage"=>"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png",
	"UserRoom"=>10,
	"_session_id"=>1234
];
echo json_encode($user);


?>

