$(document).ready(function() {
    var request;
    var button;

    checkLogin();

    $('#registerButton').click(function(event){
        button = 'register';
    });

    $('#loginButton').click(function(event){
        button = 'login';
    });

    $('#loginForm').submit(function(event){

        event.preventDefault();

        if(button == 'register') {
            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "php/register_user.php",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                if(response == '-1') {
                    $('#errorCode').text("Пользователь с таким именем уже зарегестрирован");
                }else if(response == '0') {
                    $('#errorCode').text("Внутренняя ошибка. Повторте попытку позже");
                }else{
                    $('#errorCode').text(" ");
                    setCookie("loggedIn", true, 1);
                    setCookie("email", response, 1);
                    closeLoginDialog();
                }
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                $('#errorCode').text("Возникла непредвиденная ошибка");
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                $inputs.prop("disabled", false);
            });
        }else{
            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "php/login.php",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                if(response == '-1') {
                    $('#errorCode').text("Неверный E-Mail или пароль");
                }else{
                    $('#errorCode').text(" ");
                    setCookie("loggedIn", true, 1);
                    setCookie("email", response, 1);
                    closeLoginDialog();
                }
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                $('#errorCode').text("Возникла непредвиденная ошибка");
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                $inputs.prop("disabled", false);
            });
        }
    });
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkLogin() {
    var email = getCookie("email");
    var loggedIn = getCookie("loggedIn");
    if (email != "" && loggedIn) {
        alert("Добро пожаловать, " + email);
        closeLoginDialog();
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function closeLoginDialog() {
    $('#loginContainer').remove();
}
