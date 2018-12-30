var loginButtons = document.getElementsByClassName("topic__list")[0];
var path = {
    "Stack Overflow": "stackoverflow",
    "Super User": "superuser",
    "Unix &amp; Linux": "unix",
    "Mathematics": "math",
    "Arqade": "gaming",
    "Ask Ubuntu": "askubuntu",
    "Blender": "blender",
    "Webmasters": "webmasters",
    "Cross Validated": "stats"
}

loginButtons.addEventListener("click", logUser);

function logUser(elem) {
    title = elem.target.getElementsByTagName("h2")[0];
    sessionStorage.setItem("site", path[title.innerHTML]);
    try {
        SE.authenticate("http://127.0.0.1:5500/login_succes.html");
    } catch (err) {
        showPopupError(err);
    }
}