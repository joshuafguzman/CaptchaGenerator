
//Joshua Guzman
// following the instruction of https://github.com/makeuseofcode/CAPTCHA-Validator/blob/main/script.js to learn how to code in js
//Using this to learn


// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha'); //let defines a varible
var ctx = captchaText.getContext("2d"); //var also defines a varible
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";


let userText = document.querySelector('#textBox');  // doc.querySel- returns the first Element within the document that matches the specified selector, or group of selectors
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');


// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];

// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''),captchaText.width/4, captchaText.height/2);

//This changes the color of the background when using the click button on the keyboard
function random(number) {
  return Math.floor(Math.random() * (number+1));
}
/*
// Changes the color when click is pressed
userText.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});*/
/*
//When pressing on keybord it alerts what key was pressed.
userText.addEventListener('keydown', (event) => {
  const keyName = event.key;
  
if (event.shiftKey) {
    //alert(`Key pressed ${keyName}`);
    alert(`Combination of shiftKey + ${keyName}`);
  } else {
    alert(`Key pressed ${keyName}`);
   // alert(`Combination of shiftKey + ${keyName}`);
  }
  
}, false);
*/


//Use this to count the words per minute and Characters per minute
$(function () {
    $(userText)
        .keydown(checkSpeed);
});

var iLastTime = 0;
var iTime = 0;
var iTotal = 0;
var iKeys = 0;

function checkSpeed() {
    iTime = new Date().getTime();

    if (iLastTime != 0) {
        iKeys++;
        iTotal += iTime - iLastTime;
        iWords = $(userText).val().split(/\s/).length;
        $('#CPM').html(Math.round(iKeys / iTotal * 60000, 2));
        
    }

    iLastTime = iTime;
}

//keydown makes each key that is typed go to the console log
   document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let buffer = [];

    document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=~`<,>.?/:;"}]{[|';
        const key = event.key.toLowerCase();

        // we are only interested in alphanumeric keys
        if (charList.indexOf(key) === -1) return;

        buffer.push(key);
        console.log(buffer);
    });
});


// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function(e) {
	// Key Code Value of "Enter" Button is 13

    if (e.keyCode === 13) {
        if (userText.value === c) {
            output.classList.add("correctCaptcha");
            output.innerHTML = "Correct!";
        } 

        else {
            output.classList.add("incorrectCaptcha");
            output.innerHTML = "Incorrect, please try again";
        }
    }
},false);

// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function() {
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        output.innerHTML = "Correct!";
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect, please try again";
    }
});

// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function() {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''),captchaText.width/4, captchaText.height/2);
    output.innerHTML = "";
});

// https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
// Wheel is not supported by iOS Safari but supported by Safari
// iOS Safari handles touch events
function add_scroll_event(event) {
  window.json_val[event_counter] = {
      // Returns the horizontal scroll amount of a mouse wheel (x-axis)
      'deltaX' : event.deltaX,
      // Returns the vertical scroll amount of a mouse wheel (y-axis)
      'deltaY' : event.deltaY,
      // Returns the scroll amount of a mouse wheel for the z-axis
      'deltaZ' : event.deltaZ,
      // Returns a number that represents the unit of measurements for delta values (pixels, lines or pages)
      'deltaMode' : event.deltaMode,
      'url': window.location.href,
       // current time in millisecond
      'time': Date.now(),
      // name of the event occured
      'event_type': event.type
  };
}

// Specific for macOS trackpad / webkit supported feature
// https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html
// https://developer.mozilla.org/en-US/docs/Web/API/Force_Touch_events
function add_event_force_touch(event) {
    // Retrieve the force level
    var forceLevel = event["webkitForce"];

    // Retrieve the force thresholds for click and force click
    var clickForce = MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN;
    var forceClickForce = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;


    window.json_val[event_counter] = {

        // force thresholds for click and force 
        'forceLevel': forceLevel,
        'clickForce': clickForce,
        'forceClickForce': forceClickForce,

        'url': window.location.href,
        'time': Date.now(),
        // name of the event occured
        'event_type': event.type

    };

}
//XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript. 
let getJSON = (url, callback) => {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () => {

        let status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};

getJSON('http://time.jsontest.com', (err, data) => {

    if (err != null) {
        console.error(err);
    } else {

        let text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`

        console.log(text);
    }
});

//make request so that text goes to a file
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Action to be performed when the document is read;
       document.getElementById("textBox").innerHTML = xmlhttp.responseText;
    }
};
xhttp.open("GET", "xmlhttp_info.txt", true);
xhttp.send();




