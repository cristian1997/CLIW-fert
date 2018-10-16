var menu_content = document.getElementsByClassName("header__main-bar")[0].getElementsByTagName("ul")[0];
var underline = menu_content.getElementsByTagName("hr");

function display_menu() {

    if (menu_content.style.length > 0) {
        menu_content.style = null;
        for (let i = 0; i < underline.length; ++i) {
            underline[i].style = "transform: scale(0);"
        }
    } else {
        menu_content.style = "max-height: 120px;";
        for (let i = 0; i < underline.length; ++i) {
            underline[i].style = "transform: scale(1);"
        }
    }
}