window.onload = () => {
    sessionStorage.setItem("access_token", window.location.toString().split("=")[1].split("&")[0]);
    sessionStorage.setItem("authenticated", true);
    setTimeout(redirectMainPage, 2000);
}

function redirectMainPage() {
    window.location = "http://127.0.0.1:5500/play.html";
}