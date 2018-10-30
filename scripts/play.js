window.onload = function() {
    loopAnimation();
}

function loopAnimation() {
    for (var i = 0; i < 4; i++) {
        var letter = String.fromCharCode("A".charCodeAt(0) + i);
        var response = "response" + letter;
        var animation = "animation" + letter;
        console.log(response);
        console.log(animation);
        var elem = document.getElementsByClassName(response)[0];
        changeKeyframeRule(elem, animation);
        setTimeout(loopAnimation, 3000);
    }
}

function changeKeyframeRule(elem, animation) {

    var offsetLeft = elem.offsetLeft;
    var offsetTop = elem.offsetTop;

    var elemWidth = elem.offsetWidth;
    var elemHeight = elem.offsetHeight;

    var xValue = getRandomInt(0 - offsetLeft, window.innerWidth - offsetLeft - elemWidth);
    var yValue = getRandomInt(0 - offsetTop, window.innerHeight - offsetTop - elemHeight);

    var newPosition = "100% { transform: translate(" + xValue + "px, " + yValue + "px); }";

    // Find my key frame rule.
    keyframeRule = findKeyframesRule(animation);

    // Extract second rule that is containing the old position.
    var oldPosition = keyframeRule.cssRules[1].cssText;

    // Replace the 100% key with 0%.
    oldPosition = oldPosition.replace("100%", "0%");
    // Delete rules.

    keyframeRule.deleteRule("0%");
    keyframeRule.deleteRule("100%");

    // Add the new rules.
    keyframeRule.appendRule(oldPosition);
    keyframeRule.appendRule(newPosition);

    elem.style.left = xValue + offsetLeft;
    elem.style.top = yValue + offsetTop;


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function findKeyframesRule(rule) {
  var ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { 
        return(ss[i].cssRules[j]);
      }
    }
  }
  return null;
}


// var buttons = [];
// var start = [];
// var fromX = [];
// var toX = [];
// var fromY = []
// var toY = [];
// var duration = 1000;

// function initializeAnimationVariables() {
//     // Initialize start time.
//     for (var i = 0; i < buttons.length; i++) {
//         start.push(new Date().getTime());
//     }

//     // Initialize buttons list.
//     button = document.getElementsByClassName('responseA')
//     buttons.push(button[0]);
//     button = document.getElementsByClassName('responseB')
//     buttons.push(button[0]);
//     button = document.getElementsByClassName('responseC')
//     buttons.push(button[0]);
//     button = document.getElementsByClassName('responseD')
//     buttons.push(button[0]);

//     // Initialize "fromX" positions.
//     for (var i = 0; i < buttons.length; i++) {
//         fromX.push(buttons[i].offsetLeft)
//     }

//     // Initialize "toX" positions.
//     for (var i = 0; i < buttons.length; i++) {
//         screenWidth = window.innerWidth;
//         buttonWidth = buttons[i].offsetWidth;
//         fromXPosition = fromX[i];
//         maxPosition = screenWidth - buttonWidth - fromXPosition;
//         toX.push(getRandomInt(0, maxPosition))
//     }

//     // Initialize "fromY" positions.
//     for (var i = 0; i < buttons.length; i++) {
//         fromY.push(buttons[i].offsetTop)
//     }

//     // Initialize "toY" positions.
//     for (var i = 0; i < buttons.length; i++) {
//         screenHeight = window.innerWidth;
//         buttonHeight = buttons[i].offsetHeight;
//         fromYPosition = fromY[i];
//         maxPosition = screenWidth - buttonWidth - fromYPosition;
//         toY.push(getRandomInt(0, maxPosition))
//     }
// }

// function loopAnimation() {
//     initializeAnimationVariables()
//     for (var i = 0; i < buttons.length; i++) {
//         animateButton(i);
//     }
// }

// // easing function
// function easeInOutExpo(x, t, b, c, d){
// 	if (t==0) return b;
// 	if (t==d) return b+c;
// 	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
// 	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
// }

// // animation
// function animateButton(index) {
// 	var now = (new Date().getTime() - start[index]);
// 	var ease = easeInOutExpo(0, now, 0, 1, duration);
//     buttons[index].style.left = (fromX[index] + (toX[index] - fromX[index]) * ease) + 'px';
//     buttons[index].style.top = (fromY[index] + (toY[index] - fromY[index]) * ease) + 'px';
// 	if(now < duration){
// 	    setTimeout(function() {
//             animateButton(index);
//         }, 1000/60);
// 	}
// }




//   