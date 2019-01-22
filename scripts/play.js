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
var answer_text_class = "answer_text";
var answer_first_layer = "first_answer__layer";
var answer_second_layer = "second_answer__layer";
var answer_third_layer = "third_answer__layer";
var answer_forth_layer = "forth_answer__layer";

window.onload = generate_deers(4);

// window.addEventListener("load", function() {
//     generate_deers(4);
    
//     document.getElementById("custom_answer_submit").addEventListener("click", function() {
//         var answer = document.getElementById("custom_answer_textarea").value;
//         // TODO: make request to post answer
//         // postAnswer(answer)
//         // .then(response => {
//         //     showPopupError(response);
//         //     // TODO: redirect to home ?
//         // })
//         // .catch(err => {
//         //     showPopupError(err);
//         // });
//     });
// });

var occupied_layer = {};

function setHeight(fieldId){
    document.getElementById(fieldId).style.height = document.getElementById(fieldId).scrollHeight+'px';
}

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

    removeOldDeerAndAnswer(answerNumber);

    /* 
     * This variables are lists with 2 elements, first one is the class for that 
     * direction, speed, layer and the second one is the actual value.
     */

    let deer_direction = generateDeerDirection();
    let deer_speed = generateDeerSpeed();
    let deer_layer = generateDeerLayer(answerNumber);

    var deer_classes_list = deer_class;
    deer_classes_list += deer_direction[0];
    deer_classes_list += deer_speed[0];
    deer_classes_list += deer_layer[0];

    let new_deer_image = document.createElement("img");
    new_deer_image.src = setDeerGif(deer_direction[1], deer_speed[1]);
    new_deer_image.setAttribute("class", deer_classes_list);  
    new_deer_image.setAttribute("id", "answer" + answerNumber);
    new_deer_image.addEventListener("mouseenter", function(event) {
        displayAnswer(answerNumber);
    });    
    new_deer_image.addEventListener("mouseout", function(event) {
        hideAnswer(answerNumber);
    });    

    deers_parent_div.appendChild(new_deer_image);


    let deer_animation_duration = getDeerAnimationDuration(deer_speed[1]);
    setTimeout(function() {
        createNewDeer(answerNumber);
    }, deer_animation_duration * 1000);
    
    // if(true) { // if deer answer is custom
    //     new_deer_image.addEventListener("click", displayCustomAnswerForm);
    // }
    
    
    let answer_container = document.createElement("textarea");
    answer_container.innerText = getAnswerText(answerNumber);
    answer_container.readOnly = true;
    answer_container.setAttribute("display", "none");
    answer_classes_list = answer_text_class;
    answer_classes_list += getDeerDirectionClass(deer_direction[1]);
    answer_classes_list += getDeerSpeedClass(deer_speed[1]);
    answer_classes_list += getAnswerLayerClass(deer_layer[1]);
    answer_container.setAttribute("class", answer_classes_list);
    answer_container.setAttribute("id", "textanswer" + answerNumber);

    deers_parent_div.appendChild(answer_container);
}

function displayCustomAnswerForm() {
    document.getElementById("custom_answer_textarea").style.display = "block";
}

function removeOldDeerAndAnswer(answerNumber) {
    let deers_parent_div = document.getElementById(deers_parent_div_id);
    let deer = document.getElementById("answer" + answerNumber);

    if (deer) { 
        delete occupied_layer[answerNumber];
        deers_parent_div.removeChild(document.getElementById("textanswer" + answerNumber));
        deers_parent_div.removeChild(document.getElementById("answer" + answerNumber));
    }
}

function displayAnswer(answerNumber) {
    answer_container = document.getElementById("textanswer" + answerNumber);
    answer_container.style.zIndex = 15;
}

function hideAnswer(answerNumber){
    answer_container = document.getElementById("textanswer" + answerNumber);
    answer_container.style.zIndex = 0;
}

function getDeerAnimationDuration(deer_speed) {
    if (deer_speed) {
        return getAnimationDuration("." + fast_deer_class);
    } else {
        return getAnimationDuration("." + slow_deer_class);
    }
}

function getAnimationDuration(class_name) {
    element = document.querySelector(class_name);
    style = window.getComputedStyle(element);
    animation_duration = parseInt(style.animationDuration);
    return animation_duration;
}

function generateDeerDirection() {
    var deer_direction = generateRandomIntInRange(0, 1);
    return [getDeerDirectionClass(deer_direction), deer_direction];
}

function getDeerDirectionClass(deer_direction) {
    if (deer_direction) {
        return " " + deer_from_left_class;
    } else {
        return " " + deer_from_right_class;
    }
}

function generateDeerSpeed() {
    var deer_speed = generateRandomIntInRange(0, 1);
    return [getDeerSpeedClass(deer_speed), deer_speed];
}

function getDeerSpeedClass(deer_speed) {
    if (deer_speed) {
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
    return [getDeerLayerClass(layer), layer];
}

function getDeerLayerClass(layer) {
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

function getAnswerLayerClass(layer) {
    switch(layer) {
        case 1: 
            return " " + answer_first_layer;
        case 2: 
            return " " + answer_second_layer;
        case 3: 
            return " " + answer_third_layer;
        case 4: 
            return " " + answer_forth_layer;
    }
}

function getAnswerText(answerNumber) {
    return "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";
}

function setDeerGif(left_deer, fast_deer) {
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