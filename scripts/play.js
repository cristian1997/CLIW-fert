// window.onload = function () {
//     loopAnimation();
// }

// function loopAnimation() {
//     for (var i = 0; i < 4; i++) {
//         var letter = String.fromCharCode("A".charCodeAt(0) + i);
//         var response = "response" + letter;
//         var elem = document.getElementsByClassName(response)[0];
//         changeTransform(elem);
//     }
//     setTimeout(loopAnimation, 1000);
// }

// function changeTransform(elem) {
//     var offsetLeft = elem.offsetLeft;
//     var offsetTop = elem.offsetTop;

//     var elemWidth = elem.offsetWidth;
//     var elemHeight = elem.offsetHeight;

//     var xValue = getRandomInt(0 - offsetLeft, window.innerWidth - offsetLeft - elemWidth);
//     var yValue = getRandomInt(0 - offsetTop, window.innerHeight - offsetTop - elemHeight);

//     elem.style.transform = "translate(" + xValue + "px, " + yValue + "px)";
// }


// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
// }

var left_fast_deer_gif_path = "misc/images/playground/deer_from_left_fast.gif";
var left_slow_deer_gif_path = "misc/images/playground/deer_from_left_slow.gif";
var right_fast_deer_gif_path = "misc/images/playground/deer_from_right_fast.gif";
var right_slow_deer_gif_path = "misc/images/playground/deer_from_right_slow.gif";

var deer_from_left_class = "left__deer";
var deer_from_right_class = "right__deer";
var slow_deer_class = "slow__deer";
var fast_deer_class = "fast__deer";
var deer_first_layer = "first_deer__layer";
var deer_second_layer = "second_deer__layer";
var deer_third_layer = "third_deer__layer";
var deer_forth_layer = "forth_deer__layer";
var deer_class = "deer";
var deers_parent_div_id = "walking__deers";

window.onload = generate_deers(4)

var occupied_layer = {};

function generate_deers(number_of_deers) {

    let deers_parent_div = document.getElementById(deers_parent_div_id);
    console.log("Generate deers");
    if(deers_parent_div) {
        for(let i = 0; i < number_of_deers; i++) {
            setTimeout(function() {
                createNewDeer(i);
            }, i * 1000);
        }
    }
}

function createNewDeer(answerNumber) {
    let deers_parent_div = document.getElementById(deers_parent_div_id);
    let deer = document.getElementById("answer" + answerNumber);

    if (deer) { 
        delete occupied_layer[answerNumber];
        deers_parent_div.removeChild(document.getElementById("answer" + answerNumber));
    }

    let new_deer_image = document.createElement("img");
    var class_value = deer_class;

    class_value += generateDeerDirection();
    class_value += generateDeerSpeed();
    class_value += generateDeerLayer(answerNumber);

    new_deer_image.src = setDeerGif(class_value);

    new_deer_image.setAttribute("class", class_value);  
    new_deer_image.setAttribute("id", "answer" + answerNumber);
    
    deers_parent_div.appendChild(new_deer_image);

    let deer_animation_duration = getDeerAnimationDuration(class_value);
    setTimeout(function() {
        createNewDeer(answerNumber);
    }, deer_animation_duration * 1000);
}

function getDeerAnimationDuration(string_of_classes) {
    if (string_of_classes.indexOf(slow_deer_class) >= 0) {
        return getAnimationDuration("." + slow_deer_class);
    } else {
        return getAnimationDuration("." + fast_deer_class);
    }
}

function getAnimationDuration(class_name) {
    element = document.querySelector(class_name);
    style = window.getComputedStyle(element);
    animation_duration = parseInt(style.animationDuration);
    return animation_duration;
}

function generateDeerDirection() {
    var left_deer = generateRandomIntInRange(0, 1);
    if (left_deer) {
        return " " + deer_from_left_class;
    } else {
        return " " + deer_from_right_class;
    }
}

function generateDeerSpeed() {
    var fast_deer = generateRandomIntInRange(0, 1);
    if (fast_deer) {
        return " " + fast_deer_class;
    } else {
        return " " + slow_deer_class;
    }
}

function generateDeerLayer(answerNumber) {
    var layer = generateRandomIntInRange(1, 4);
    while(Object.values(occupied_layer).includes(layer)) {
        layer = generateRandomIntInRange(1, 4);    
    }
    occupied_layer[answerNumber] = layer;

    switch(layer) {
        case 1: 
            return " " + deer_first_layer;
        case 2: 
            return " " + deer_second_layer;
        case 3: 
            return " " + deer_third_layer;
        case 4: 
            return " " + deer_forth_layer;
    }
}

function setDeerGif(class_value) {
    let left_deer = false;
    let fast_deer = false;

    if(class_value.includes(deer_from_left_class)) {
        left_deer = true;
    }

    if(class_value.includes(fast_deer_class)) {
        fast_deer = true;
    }

    if(left_deer && fast_deer) {
        return left_fast_deer_gif_path;
    } else if(left_deer && !fast_deer) {
        return left_slow_deer_gif_path;
    } else if(!left_deer && fast_deer) {
        return right_fast_deer_gif_path;
    } else if(!left_deer && !fast_deer) {
        return right_slow_deer_gif_path;
    }
}

function generateRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}