var left_fast_deer_gif_path = "misc/images/playground/deer_from_left_fast.gif";
var left_slow_deer_gif_path = "misc/images/playground/deer_from_left_slow.gif";
var right_fast_deer_gif_path = "misc/images/playground/deer_from_right_fast.gif";
var right_slow_deer_gif_path = "misc/images/playground/deer_from_right_slow.gif";

var deer_from_left_class = "left__deer";
var deer_from_right_class = "right__deer";
var slow_deer_class = "slow__deer";
var fast_deer_class = "fast__deer";
var deer_layer = "deer_layer";
var game_bubbles_theme_class = "game_bubbles_theme";
var deer_class = "deer";
var deers_parent_div_id = "walking__deers";
var answer_text_class = "answer_text";
var answer_layer = "answer_layer";
var deer_max_layer = 6;

var generate_deer_functions_ids = []

var state = {
    questionId: 1000,
    questionBody: "Waiting for question to be received...",
    answers: []
};

function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

window.addEventListener("message", event => {
    switch (event.data.type) {
        case AppConfig.EVENTS.RECEIVED_QUESTIONS:
            // TODO: select question smart :)
            var idx = generateRandomIntInRange(0, 99);
            state.questionId = event.data.payload[idx].question_id;
            state.questionBody = event.data.payload[idx].body_markdown;
            state.questionBody = decodeHtml(state.questionBody);


            // Add question text in container.
            document.getElementById("question__text").innerText = state.questionBody;


            SE.eventWrapper(SE.getAnswers, state.questionId, Math.min(4, event.data.payload[idx].answer_count));
            break

        case AppConfig.EVENTS.RECEIVED_ANSWERS:
            event.data.payload.forEach(answer => {
                state.answers.push({
                    id: answer.answer_id,
                    body: answer.body_markdown,
                    is_accepted: answer.is_accepted
                });
            });

            // Generate deers usign the received answers.
            generate_deers(state.answers.length);
            break;

        case AppConfig.EVENTS.POST_ANSWER_WRITE_SUCCES:
            fetch("http://127.0.0.1:5500/update", {
                    method: 'post',
                    body: 'account_id=' + sessionStorage.getItem("account_id") + '&nr_posted_answers=1'
                })
                .catch(err => {
                    console.log(err);
                });

            resetGame();
            break;

        case AppConfig.EVENTS.UPVOTE_WRITE_SUCCES:
            resetGame();
            break;
    }
});

window.addEventListener("load", function () {
    if (!isAuthenticated()) {
        showPopupError("Need to authenticate!");
    } else {
        SE.eventWrapper(SE.getQuestions, 100);
    }
});

var occupied_layer = {};

function setHeight(fieldId) {
    document.getElementById(fieldId).style.height = document.getElementById(fieldId).scrollHeight + 'px';
}

function generate_deers(number_of_deers) {

    let deers_parent_div = document.getElementById(deers_parent_div_id);
    if (deers_parent_div) {
        for (let i = 0; i <= number_of_deers; i++) {
            setTimeout(function () {
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
    new_deer_image.addEventListener("mouseenter", function (event) {
        displayAnswer(answerNumber);
    });
    new_deer_image.addEventListener("mouseout", function (event) {
        hideAnswer(answerNumber);
    });
    new_deer_image.addEventListener("click", function (event) {
        submitUpvote(answerNumber);
    });
    new_deer_image.addEventListener("wheel", function (event) {
        event.preventDefault();
        scrollAnswerText(event, answerNumber);
    });

    deers_parent_div.appendChild(new_deer_image);

    let deer_animation_duration = getDeerAnimationDuration(deer_speed[1]);
    var function_id = setTimeout(function () {
        createNewDeer(answerNumber);
    }, deer_animation_duration * 1000);

    generate_deer_functions_ids.push(function_id);

    // if(true) { // if deer answer is custom
    //     new_deer_image.addEventListener("click", displayCustomAnswerForm);
    // }

    let answer_container = document.createElement("textarea");
    answer_container.innerText = decodeHtml(getAnswerText(answerNumber));
    answer_container.readOnly = true;
    answer_container.setAttribute("display", "none");
    answer_classes_list = answer_text_class;
    answer_classes_list += " " + game_bubbles_theme_class;
    answer_classes_list += getDeerDirectionClass(deer_direction[1]);
    answer_classes_list += getDeerSpeedClass(deer_speed[1]);
    answer_classes_list += getAnswerLayerClass(deer_layer[1]);
    answer_container.setAttribute("class", answer_classes_list);
    answer_container.setAttribute("id", "textanswer" + answerNumber);
    deers_parent_div.appendChild(answer_container);
}

window.addEventListener("message", function () {
    if (event.data.type === AppConfig.EVENTS.ON_ERROR && sessionStorage.getItem("authenticated")) {
        resetGame();
    }
});

function submitUpvote(answerNumber) {
    if (answerNumber === state.answers.length) {
        custom_answer_form = document.getElementById("custom_answer_form");
        custom_answer_form.setAttribute("class", "add_fade_in");
    } else {
        SE.eventWrapper(SE.upvoteAnswer, state.answers[answerNumber].id);

        if (state.answers[answerNumber].is_accepted) {
            fetch("http://127.0.0.1:5500/update", {
                    method: 'post',
                    body: 'account_id=' + sessionStorage.getItem("account_id") + '&nr_accepted_answers=1'
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            fetch("http://127.0.0.1:5500/update", {
                    method: 'post',
                    body: 'account_id=' + sessionStorage.getItem("account_id") + '&nr_upvotes=1'
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

function cancelCustomAnswer() {
    custom_answer_form = document.getElementById("custom_answer_form");
    custom_answer_form.setAttribute("class", "add_fade_out");
}

function clearOldContent() {
    // Remove old deers and the answers.
    for (let i = 0; i <= state.answers.length; i++) {
        removeOldDeerAndAnswer(i);
    }

    // Clear functions that will generate new deers.
    for (let i = 0; i < generate_deer_functions_ids.length; i++) {
        clearTimeout(generate_deer_functions_ids[i]);
    }

    state.answers = [];

    // Make the custom answer textarea disapear.
    custom_answer_form = document.getElementById("custom_answer_form");
    var style = window.getComputedStyle(custom_answer_form);
    if (style.opacity > 0) {
        cancelCustomAnswer();
    }

    document.getElementById("question__text").innerText = "Waiting for new question to be received...";
}

function resetGame() {
    clearOldContent();
    SE.eventWrapper(SE.getQuestions, 100);
}


function submitCustomAnswer() {
    custom_answer_text = document.getElementById("custom_answer_textarea").value;

    SE.eventWrapper(SE.postAnswer, state.questionId, custom_answer_text);
}

function scrollAnswerText(scrollEvent, answerNumber) {
    text_answer = document.getElementById("textanswer" + answerNumber);
    text_answer.scrollTop += scrollEvent.deltaY;
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

function hideAnswer(answerNumber) {
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
    var layer = generateRandomIntInRange(1, deer_max_layer);
    while (Object.values(occupied_layer).includes(layer)) {
        layer = generateRandomIntInRange(1, deer_max_layer);
    }
    occupied_layer[answerNumber] = layer;
    return [getDeerLayerClass(layer), layer];
}

function getDeerLayerClass(layer) {
    return " " + deer_layer + layer;
}

function getAnswerLayerClass(layer) {
    return " " + answer_layer + layer;
}

function getAnswerText(answerNumber) {

    if (answerNumber === state.answers.length) {
        return "Try out to answer with your own answer!";
    }

    if (state.answers[answerNumber] != undefined) {
        return state.answers[answerNumber].body;
    } else {
        return "Waiting for answers to be received...";
    }
}

function setDeerGif(left_deer, fast_deer) {
    if (left_deer && fast_deer) {
        return left_fast_deer_gif_path;
    } else if (left_deer && !fast_deer) {
        return left_slow_deer_gif_path;
    } else if (!left_deer && fast_deer) {
        return right_fast_deer_gif_path;
    } else if (!left_deer && !fast_deer) {
        return right_slow_deer_gif_path;
    }
}

function generateRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}