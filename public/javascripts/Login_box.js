var obj;
window.onload = function () {
    var login = document.getElementById('bttnlogin');
    var cancel_login = document.getElementById('bttncancel_login');
    var display = document.getElementById('bttnacclogin');
    var acc = document.getElementById('bttnaccount');
    var login_box = document.getElementById("login_box");
    cancel_login.onclick = function () {
        login_box.style.display = 'none';
    };
    display.onclick = function (req) {
        login_box.style.display = 'block';
    };
    acc.onclick = function () {
    };
};
