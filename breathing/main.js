
const circle = document.getElementById("circle");
const spinDiv = document.getElementById("spinDiv");
const markDiv = document.getElementById("markDiv");
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
conf.timeoutIn = null;
conf.timeoutHold = null;
conf.timeoutOut = null;

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

function setHoldText(hide) {
    circleText.innerHTML = "Hold";
    if (hide) circle.style.borderWidth = "0";
    markDiv.style.visibility = "visible";
    spinDiv.style.visibility = "visible";
    spinDiv.style.transition = `all ${conf.delayPause}ms linear`;
    spinDiv.style.transform = "rotate(360deg)";
}

function clickHandler(onStart, onStop, id) {
    if (disabled[id]) {
        return;
    }

    if (conf.running) {
        clearTimeout(conf.timeoutIn);
        clearTimeout(conf.timeoutHold);
        clearTimeout(conf.timeoutOut);
        circle.style.transition = "none";
        circle.style.width = "234px";
        circle.style.height = "234px";
        markDiv.style.visibility = "hidden";
        spinDiv.style.transition = `all 0ms linear`;
        spinDiv.style.transform = "none";
        spinDiv.style.visibility = "hidden";
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
    markDiv.style.visibility = "hidden";
    spinDiv.style.transition = `all 0ms linear`;
    spinDiv.style.transform = "none";
    spinDiv.style.visibility = "hidden";
    circle.style.transition = `width ${conf.delayIn}ms linear, height ${conf.delayIn}ms linear`;
    circle.style.width = "0px";
    circle.style.height = "0px";
    circleText.innerHTML = "Breathe in";
    conf.timeoutHold = setTimeout(() => setHoldText(true), conf.delayIn);
    conf.timeoutOut = setTimeout(pulseOut, conf.delayIn + conf.delayPause);
}

function pulseOut() {
    markDiv.style.visibility = "hidden";
    spinDiv.style.transition = `all 0ms linear`;
    spinDiv.style.transform = "none";
    spinDiv.style.visibility = "hidden";
    circle.style.transition = `width ${conf.delayOut}ms linear, height ${conf.delayOut}ms linear`;
    circle.style.width = "234px";
    circle.style.height = "234px";
    circle.style.borderWidth = "8px";
    circleText.innerHTML = "Breathe out";
    conf.timeoutHold = setTimeout(setHoldText, conf.delayOut);
    conf.timeoutIn = setTimeout(pulseIn, conf.delayOut + conf.delayPause);
}
