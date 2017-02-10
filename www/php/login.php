<?php
include "dbauth.php";
$email = $_POST['email'];
$pass = $_POST['pass'];
$query = 'SELECT * FROM `users` WHERE email=\'' . $email . '\' AND pass=\''.md5($pass).'\'';
$result = mysqli_query($link, $query) or die('0');
if(mysqli_num_rows($result) != 0){
    echo $email;
}else{
    echo -1;
}
mysqli_free_result($result);
mysqli_close($link);
?>