var menu_content = document.getElementsByClassName("header__main-bar")[0].getElementsByTagName("ul")[0];
var underline = menu_content.getElementsByTagName("hr");
var logo = document.getElementsByClassName("logo")[0];

logo.onload = changeProfilePicture()

function changeProfilePicture() {
    if (sessionStorage.getItem("authenticated")) {
        if (sessionStorage.getItem("picture") === null) {
            SE.getUserInfo()
                .then((result) => {
                    sessionStorage.setItem("picture", result.profile_image);
                    logo.setAttribute("class", "logo fadeIn");
                    logo.src = sessionStorage.getItem("picture");
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            logo.src = sessionStorage.getItem("picture");
            logo.setAttribute("class", "logo fadeIn");
        }
    } else {
        logo.src = "./misc/images/logo.jpg"
        logo.setAttribute("class", "logo fadeIn");
    }
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
        setTimeout(hidePopupError, 2000, popup)
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