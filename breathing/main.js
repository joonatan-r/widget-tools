
const circle = document.getElementById("circle");
const button = document.getElementById("button");
const buttonText = document.getElementById("buttonText");

const delayIn = 4000;
const delayOut = 6000;
const delayPause = 2000;
let running = false;
let timeoutIn = null;
let timeoutOut = null;

button.onclick = () => {
    if (running) {
        clearTimeout(timeoutIn);
        clearTimeout(timeoutOut);
        circle.style.transition = "none";
        circle.style.width = "234px";
        circle.style.height = "234px";
        buttonText.innerHTML = "Start";
    } else {
        pulseIn();
        buttonText.innerHTML = "Stop";
    }
    running = !running;
};
buttonText.innerHTML = "Start";

function pulseIn() {
    circle.style.transition = `all ${delayIn}ms linear`;
    circle.style.width = "8px";
    circle.style.height = "8px";
    timeoutOut = setTimeout(pulseOut, delayIn + delayPause);
}

function pulseOut() {
    circle.style.transition = `all ${delayOut}ms linear`;
    circle.style.width = "234px";
    circle.style.height = "234px";
    timeoutIn = setTimeout(pulseIn, delayOut + delayPause);
}
