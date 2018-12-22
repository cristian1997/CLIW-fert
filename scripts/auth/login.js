var loginButton = document.getElementsByTagName("li")[2];

loginButton.addEventListener("click", logUser);

function logUser() {
    SE.authenticate("http://127.0.0.1:5500/login_succes.html");
}