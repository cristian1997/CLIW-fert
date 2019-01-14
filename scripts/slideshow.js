var images = document.getElementsByClassName("panel__container");
var slideIndex = 0;

next_image()

testWebP(function (supported) {
    if (!supported) {
        panelThree = document.getElementById("panel__three");
        panelTwo = document.getElementById("panel__two");
        panelOne = document.getElementById("panel__one");
        panelThree.style.backgroundImage = "url('../misc/images/Question.jpg')";
        panelTwo.style.backgroundImage = "url('../misc/images/People.jpg')";
        panelOne.style.backgroundImage = "url('../misc/images/Pencils.jpg')";
    }
});

function testWebP(callback) {
    var webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' +
        'AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
}

function next_image() {
    if (window.innerWidth < 700) {
        return;
    }
    if (slideIndex >= images.length) {
        slideIndex = 0
    }
    images[slideIndex].style.opacity = "0";
    images[(slideIndex + 1) % images.length].style.opacity = "1";
    slideIndex++;
    timeout_function = setTimeout(next_image, 10000);
}