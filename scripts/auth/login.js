var urlPath = "https://stackexchange.com/oauth/dialog";
var clientID = 13513;
var scope = "write_access";
var redirectUri = "http://127.0.0.1:5500/login_succes.html";
var loginButton = document.getElementsByTagName("li")[2];


loginButton.addEventListener("click" , logUser);


function logUser() {
    if(!sessionStorage.getItem("authenticated")){
        window.location = urlPath + "/?client_id=" + clientID + "&" + "scope=" + scope + "&" + "redirect_uri=" + redirectUri;
    }

}


