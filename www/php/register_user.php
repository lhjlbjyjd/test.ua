<?php
include "dbauth.php";
$email = $_POST['email'];
$login = explode("@", $email);
$pass = $_POST['pass'];
$query = 'SELECT * FROM `users` WHERE email=\'' . $email . '\' AND login=\''.$login[0].'\'';
$result = mysqli_query($link, $query) or die('0');
if(mysqli_num_rows($result) == 0){
    $query = 'INSERT INTO `users` (`login`,`email`, `pass`) VALUES (\'' . $login[0] . '\',\'' . $email . '\',\'' . md5($pass) . '\')';
    mysqli_query($link, $query) or die('1');
    mkdir("../users/".$login[0]);
    echo $email;
}else{
    echo '-1';
}
mysqli_free_result($result);
mysqli_close($link);
?>