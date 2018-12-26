var loginButtons = document.getElementsByClassName("topic__list")[0];

loginButtons.addEventListener("click", logUser);

function getSiteFromString(string) {
    if (string === "Stack Overflow") {
        return "stackoverflow"
    }
    if (string === "Super User") {
        return "superuser"
    }
    if (string === "Unix &amp; Linux") {
        return "unix";
    }
    if (string === "Mathematics") {
        return "math";
    }
    if (string === "Arqade") {
        return "gaming";
    }
    if (string === "Ask Ubuntu") {
        return "askubuntu";
    }
    if (string === "Blender") {
        return "blender";
    }
    if (string === "Webmasters") {
        return "webmasters";
    }
    if (string === "Cross Validated") {
        return "stats";
    }
}

function logUser(elem) {
    title = elem.target.getElementsByTagName("h2")[0];
    sessionStorage.setItem("site", getSiteFromString(title.innerHTML));
    try {
        SE.authenticate("http://127.0.0.1:5500/login_succes.html");
    } catch (err) {
        showPopupError(err);
    }
}