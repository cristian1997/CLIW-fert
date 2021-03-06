var menu_content = document.getElementsByClassName("header__main-bar")[0].getElementsByTagName("ul")[0];
var underline = menu_content.getElementsByTagName("hr");
var logo = document.getElementsByClassName("logo")[0];
var auth = document.getElementsByTagName("li")[3].getElementsByTagName("a")[0];

setLogoPicture();

auth.addEventListener("click", logOutUser);

window.addEventListener("message", (event) => {
    if (event.data.type === AppConfig.EVENTS.NO_SITE_ACCOUNT) {
        sessionStorage.clear();
    }
    if (event.data.type === AppConfig.EVENTS.ON_ERROR) {
        showPopupError(event.data.payload)
    }
    if (event.data.type === AppConfig.EVENTS.RECEIVED_USER_INFO) {
        if (sessionStorage.getItem("account_id") == null) {
            /* add user on BE database */
            fetch("http://127.0.0.1:5500/add", {
                    method: 'post',
                    body: 'account_id=' + event.data.payload.account_id
                })
                .catch(err => {
                    console.log(err);
                });
        }
        sessionStorage.setItem("picture", event.data.payload.profile_image);
        sessionStorage.setItem("account_id", event.data.payload.account_id);
        sessionStorage.setItem("user_id", event.data.payload.user_id);
        setLogoPicture();
        setLinks();
    }
});

function setLogoPicture() {
    let path = "./misc/images/logo.jpg";
    if (isAuthenticated() && isSetPicture() && sessionStorage.getItem("picture") !== null)
        path = sessionStorage.getItem("picture")
    if (isAuthenticated() && !isSetPicture()) {
        getUserInfo()
    }
    setPath(path);
}

function logOutUser() {
    SE.eventWrapper(SE.logout);
    if (isAuthenticated()) {
        sessionStorage.clear();
        window.location = "./index.html";
    }
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

function getUserInfo() {
    try {
        SE.eventWrapper(SE.getUserInfo);
    } catch (err) {
        showPopupError(err);
    }
}

function hidePopupError(elem) {
    // popup.removeAttribute("class");
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
        popup.setAttribute("class" , "error__popup");
        popup.style = "max-height: 30vh;";
        popup.innerHTML = err;
        parent.insertBefore(popup, parent.firstChild);
        window.scrollTo(0, 0);
        setTimeout(hidePopupError, 3000, popup)
    }
}

function showDefaultPopup(text) {
    if (document.getElementById("error") === null) {
        parent = document.getElementsByTagName("body")[0];
        popup = document.createElement("aside");
        popup.setAttribute("id", "error");
        popup.setAttribute("class" , "default__popup");
        popup.style = "max-height: 30vh;";
        popup.innerHTML = text;
        parent.insertBefore(popup, parent.firstChild);
        window.scrollTo(0, 0);
        setTimeout(hidePopupError, 3000, popup)
    }
}

function displayMenu() {
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