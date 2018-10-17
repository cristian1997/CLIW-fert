var images = document.getElementsByClassName("panel__container");
var slide_index = 0;

function next_image() {
    console.log(slide_index);
    if (slide_index >= images.length) {
        slide_index = 0
    }
    for (let i = 0; i < images.length; ++i) {
        images[i].style.display = "none";
    }
    images[slide_index++].style = "animation: fadeInFromNone 20s ease-in;";
    setTimeout(next_image, 20000);
}

next_image();