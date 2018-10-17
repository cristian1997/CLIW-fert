var images = document.getElementsByClassName("panel__container");
var slide_index = 0;

function next_image() {
    if(window.innerWidth < 700){
        return;
    }
    console.log(slide_index);
    if (slide_index >= images.length) {
        slide_index = 0
    }
    images[slide_index].style.opacity = "0";
    images[(slide_index + 1) % images.length].style.opacity = "1";
    slide_index++;
    timeout_function = setTimeout(next_image, 15000);
}

next_image()