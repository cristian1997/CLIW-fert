var menu_content = document.getElementsByClassName("header__main-bar")[0].getElementsByTagName("ul")[0];
var underline = menu_content.getElementsByTagName("hr");
var logo = document.getElementsByClassName("logo")[0];
var auth = document.getElementsByTagName("li")[3].getElementsByTagName("a")[0];

auth.addEventListener("click", logOutUser);

window.addEventListener("message", (event) => {
    if (event.data.type === AppConfig.EVENTS.RECEIVED_USER_INFO) {
        sessionStorage.setItem("picture", event.data.payload.profile_image);
        setLogoPicture();
    }
});

window.onload = () => {
    setLogoPicture()
}

function logOutUser() {
    SE.logout()
        .then(() => {
            sessionStorage.clear();
            window.location = "./index.html"
        }).catch((err) => {
            showPopupError(err);
        });
}

function isAuthenticated() {
    if (sessionStorage.getItem("authenticated") !== null)
        return true
    return false
}

function isSetPicture() {
    if (sessionStorage.getItem("picture") !== null)
        return true
    return false
}

function setPath(path) {
    logo.src = path
    logo.setAttribute("class", "logo fadeIn");
}

function setLogoPicture() {
    let path = "";
    if (!isAuthenticated())
        path = "./misc/images/logo.jpg";
    if (isAuthenticated() && isSetPicture())
        path = sessionStorage.getItem("picture")
    if (isAuthenticated() && !isSetPicture())
        SE.eventWrapper(SE.getUserInfo)
    setPath(path);
}

function hidePopupError(elem) {
    popup.removeAttribute("class");
    popup.style = null;
    setTimeout((elem) => {
        elem.remove()
    }, 1000, elem);
}

function showPopupError(err) {
    if (document.getElementById("error") === null) {
        parent = document.getElementsByTagName("body")[0];
        popup = document.createElement("aside");
        popup.setAttribute("id", "error");
        popup.style = "max-height: 30vh;";
        popup.innerHTML = err;
        parent.insertBefore(popup, parent.firstChild);
        window.scrollTo(0, 0);
        setTimeout(hidePopupError, 3000, popup)
    }
}

function display_menu() {
    if (menu_content.style.length > 0) {
        menu_content.style = null;
        for (let i = 0; i < underline.length; ++i) {
            underline[i].style.transform = "";
        }
    } else {
        menu_content.style = "max-height: 30vh;";
        for (let i = 0; i < underline.length; ++i) {
            underline[i].style.transform = "scale(1)";
        }
    }
}