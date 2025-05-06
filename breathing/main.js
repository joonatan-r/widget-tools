
const circle = document.getElementById("circle");
const circleBg = document.getElementById("circleBg");
const circleBgLeft = document.getElementById("circleBgLeft");
const circleBgRight = document.getElementById("circleBgRight");
const circleBgProgress = document.getElementById("circleBgProgress");
const circleText = document.getElementById("circleText");
const button1 = document.getElementById("button1");
const buttonText1 = document.getElementById("buttonText1");
const button2 = document.getElementById("button2");
const buttonText2 = document.getElementById("buttonText2");
const button3 = document.getElementById("button3");
const buttonText3 = document.getElementById("buttonText3");

buttonText1.innerHTML = "Start (4s/6s/2s)";
buttonText2.innerHTML = "Start (4s/4s/4s)";
buttonText3.innerHTML = "Start (4s/8s/4s)";

const disabled = {};
const conf = {};
conf.delayIn = 4000;
conf.delayOut = 6000;
conf.delayPause = 2000;
conf.running = false;
conf.timeoutHold = null;

function setMode1() {
    conf.delayIn = 4000;
    conf.delayOut = 6000;
    conf.delayPause = 2000;
}

function setMode2() {
    conf.delayIn = 4000;
    conf.delayOut = 4000;
    conf.delayPause = 4000;
}

function setMode3() {
    conf.delayIn = 4000;
    conf.delayOut = 8000;
    conf.delayPause = 4000;
}

function clearText() {
    circleText.innerHTML = "";
}

function setHoldTextAndStartProgress(isIn) {
    circleText.innerHTML = "Hold";
    if (isIn) circle.style.borderWidth = "0";
    circleBgProgress.style.transition = `all ${conf.delayPause / 2}ms linear`;
    circleBgProgress.style.transform = "rotate(180deg)";
    if (isIn) {
        circleBgProgress.addEventListener("transitionend", finishProgressIn);
    } else {
        circleBgProgress.addEventListener("transitionend", finishProgressOut);
    }
}

function finishProgressIn() {
    circleBgProgress.removeEventListener("transitionend", finishProgressIn);
    circleBgRight.style.backgroundColor = "lightseagreen";
    circleBgLeft.style.zIndex = 2;
    circleBgProgress.style.transform = "rotate(360deg)";
    circleBgProgress.addEventListener("transitionend", pulseOut);
}

function finishProgressOut() {
    circleBgProgress.removeEventListener("transitionend", finishProgressOut);
    circleBgRight.style.backgroundColor = "lightseagreen";
    circleBgLeft.style.zIndex = 2;
    circleBgProgress.style.transform = "rotate(360deg)";
    circleBgProgress.addEventListener("transitionend", pulseIn);
}

function clickHandler(onStart, onStop, id) {
    if (disabled[id]) {
        return;
    }

    if (conf.running) {
        clearTimeout(conf.timeoutHold);
        circleBgProgress.removeEventListener("transitionend", finishProgressIn);
        circleBgProgress.removeEventListener("transitionend", finishProgressOut);
        circleBgProgress.removeEventListener("transitionend", pulseOut);
        circleBgProgress.removeEventListener("transitionend", pulseIn);
        circle.style.transition = "none";
        circle.style.width = "237px";
        circle.style.height = "237px";
        circle.style.borderWidth = "8px";
        circleBgRight.style.backgroundColor = "black";
        circleBgLeft.style.zIndex = 4;
        circleBgProgress.style.transition = `all 0ms linear`;
        circleBgProgress.style.transform = "none";
        clearText();
        onStop();
    } else {
        onStart();
        pulseIn();
    }
    conf.running = !conf.running;
}

function disable(buttons) {
    buttons.forEach(b => {
        disabled[b.id] = b;
        b.classList.add("disabled");
    });
}

function enable(buttons) {
    buttons.forEach(b => {
        delete disabled[b.id];
        b.classList.remove("disabled");
    });
}

button1.onclick = () => clickHandler(
    () => {
        setMode1();
        disable([button2, button3]);
        buttonText1.innerHTML = "Stop";
    },
    () => {
        enable([button2, button3]);
        buttonText1.innerHTML = "Start (4s/6s/2s)";
    },
    button1.id
);
button2.onclick = () => clickHandler(
    () => {
        setMode2();
        disable([button1, button3]);
        buttonText2.innerHTML = "Stop";
    },
    () => {
        enable([button1, button3]);
        buttonText2.innerHTML = "Start (4s/4s/4s)";
    },
    button2.id
);
button3.onclick = () => clickHandler(
    () => {
        setMode3();
        disable([button1, button2]);
        buttonText3.innerHTML = "Stop";
    },
    () => {
        enable([button1, button2]);
        buttonText3.innerHTML = "Start (4s/8s/4s)";
    },
    button3.id
);

function pulseIn() {
    circleBgProgress.removeEventListener("transitionend", pulseIn);
    circleBgProgress.style.transition = `all 0ms linear`;
    circleBgProgress.style.transform = "none";
    circleBgRight.style.backgroundColor = "black";
    circleBgLeft.style.zIndex = 4;
    circle.style.transition = `width ${conf.delayIn}ms linear, height ${conf.delayIn}ms linear`;
    circle.style.width = "0px";
    circle.style.height = "0px";
    circleText.innerHTML = "Breathe in";
    conf.timeoutHold = setTimeout(() => setHoldTextAndStartProgress(true), conf.delayIn);
}

function pulseOut() {
    circleBgProgress.removeEventListener("transitionend", pulseOut);
    circleBgProgress.style.transition = `all 0ms linear`;
    circleBgProgress.style.transform = "none";
    circleBgRight.style.backgroundColor = "black";
    circleBgLeft.style.zIndex = 4;
    circle.style.transition = `width ${conf.delayOut}ms linear, height ${conf.delayOut}ms linear`;
    circle.style.width = "237px";
    circle.style.height = "237px";
    circle.style.borderWidth = "8px";
    circleText.innerHTML = "Breathe out";
    conf.timeoutHold = setTimeout(setHoldTextAndStartProgress, conf.delayOut);
}
