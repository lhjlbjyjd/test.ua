function checkCookie() {
    var username = getCookie("username");
    var loggedIn = getCookie("loggedIn");
    if (username != "" && loggedIn) {
        alert("Добро пожаловать, " + username);
    } else {
        //setCookie("username", username, 365);
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}