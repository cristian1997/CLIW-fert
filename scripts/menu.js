var menu_content = document.getElementsByClassName("header__main-bar")[0].getElementsByTagName("ul")[0];

function display_menu() {

    if (menu_content.style.length > 0) {
        menu_content.style = null;
    } else {
        menu_content.style = "max-height: 100px;";
    }
}