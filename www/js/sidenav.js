$(document).ready(function() {
    $('#menuTrigger').mouseover(function (event) {
        menuTrigger(event);
    });
    if(isLoggedIn()){
        $('#userEmail').html(getCookie("email"));
    }
});

function openMenu() {
    document.getElementById("sideNav").style.transform = "translateX(0)";
}

function closeMenu() {
    document.getElementById("sideNav").style.transform = "translateX(-102%)";
    $('#sideNav_bg').css("background", "rgba(0, 0, 0, 0)");
    $('#menuTrigger').mouseover(function (event) {
        menuTrigger(event);
    });
}


function isLoggedIn() {
    return getCookie("loggedIn");
}

function menuTrigger(event) {
    if(isLoggedIn()) {
        openMenu();
        $('#menuTrigger').unbind("mouseover");
        $('#sideNav_bg').css("background", "rgba(0, 0, 0, 0.15)");
        $('#clickHolder').css("display", "block");
        console.log("LOG");
        $('#clickHolder').click( function (event) {
            closeMenu();
            $('#clickHolder').unbind("click");
            $('#clickHolder').css("display", "none");
         });
    }
}