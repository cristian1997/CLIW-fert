window.onload = function() {
    // loopAnimation();
}

function loopAnimation() {
    for (var i = 0; i < 4; i++) {
        var letter = String.fromCharCode("A".charCodeAt(0) + i);
        var response = "response" + letter;
        var elem = document.getElementsByClassName(response)[0];
        changeTransform(elem);
    }
    setTimeout(loopAnimation, 1000);
}

function changeTransform(elem) {
    var offsetLeft = elem.offsetLeft;
    var offsetTop = elem.offsetTop;

    var elemWidth = elem.offsetWidth;
    var elemHeight = elem.offsetHeight;

    var xValue = getRandomInt(0 - offsetLeft, window.innerWidth - offsetLeft - elemWidth);
    var yValue = getRandomInt(0 - offsetTop, window.innerHeight - offsetTop - elemHeight);

    elem.style.transform = "translate(" + xValue + "px, " + yValue + "px)";
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}