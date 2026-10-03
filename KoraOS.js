let highestZ = 100;



const clock = document.getElementById("clock");

// const remember to add next time something new come to my head.// 
const aboutmeWindow = document.getElementById("aboutmeWindow");
const notesWindow = document.getElementById("notesWindow");
const calculatorWindow = document.getElementById("calculatorWindow");
const cookieWindow = document.getElementById("cookieWindow");
const paintWindow = document.getElementById("paintWindow");

const windows = document.querySelectorAll(".window");


function updateClock() {

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();

    if (m < 10) {
        m = "0" + m;
    }

    clock.textContent = h + ":" + m;
}

updateClock();

setInterval(updateClock, 1000);


function openWindow(app) {

    switch (app) {

        case "paint":
            paintWindow.style.display = "block";
            bringToFront(paintWindow);
            break;

        case "aboutme":
            aboutmeWindow.style.display = "block";
            bringToFront(aboutmeWindow);
            break;

        case "notes":
            notesWindow.style.display = "block";
            bringToFront(notesWindow);
            break;

        case "calculator":
            calculatorWindow.style.display = "block";
            bringToFront(calculatorWindow);
            break;

        case "cookie":
            cookieWindow.style.display = "block";
            bringToFront(cookieWindow);
            break;

    }

}

function closeWindow(app) {

    switch (app) {

        case "paint":
            paintWindow.style.display = "none";
            break;
// closes the notes window insted of the paint window(Intentional).
         case "aboutme":
            // It has noteswindow, instead of aboutmewindow
            // ↓
            notesWindow.style.display = "none";
            break;

        case "notes":
            notesWindow.style.display = "none";
            break;

        case "calculator":
            calculatorWindow.style.display = "none";
            break;

        case "cookie":
            cookieWindow.style.display = "none";
            break;

    }

}


function bringToFront(win) {

    highestZ++;

    win.style.zIndex = highestZ;

}



windows.forEach(win => {

    makeDraggable(win);

});

function makeDraggable(win) {

    const header = win.querySelector(".windowHeader");

    let mouseX = 0;
    let mouseY = 0;

    header.addEventListener("mousedown", startDrag);

    function startDrag(e) {

        bringToFront(win);

        mouseX = e.clientX;
        mouseY = e.clientY;

        document.addEventListener("mousemove", drag);

        document.addEventListener("mouseup", stopDrag);

    }

    function drag(e) {

        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;

        mouseX = e.clientX;
        mouseY = e.clientY;

        let left = win.offsetLeft + dx;
        let top = win.offsetTop + dy;

        left = Math.max(0,
            Math.min(
                window.innerWidth - win.offsetWidth,
                left
            )
        );

        top = Math.max(0,
            Math.min(
                window.innerHeight - 60 - win.offsetHeight,
                top
            )
        );

        win.style.left = left + "px";
        win.style.top = top + "px";

    }

    function stopDrag() {

        document.removeEventListener("mousemove", drag);

        document.removeEventListener("mouseup", stopDrag);

    }

}



windows.forEach(win => {

    win.addEventListener("mousedown", function () {

        bringToFront(win);

    });

});


let cookies =
parseInt(localStorage.getItem("koraCookies")) || 0;

let clickPower =
parseInt(localStorage.getItem("koraClickPower")) || 1;

let upgradeCost =
parseInt(localStorage.getItem("koraUpgradeCost")) || 10;

const cookieButton =
document.getElementById("cookieButton");

const cookieCount =
document.getElementById("cookieCount");

const cookiePower =
document.getElementById("cookiePower");

const cookieUpgrade =
document.getElementById("cookieUpgrade");

function updateCookieUI(){

    if(!cookieCount) return;

    cookieCount.textContent =
    "Cookies: " + cookies;

    cookiePower.textContent =
    "Cookies Per Click: " + clickPower;

    cookieUpgrade.innerHTML =
    "Upgrade<br>Cost: " +
    upgradeCost +
    " Cookies";

}

function saveCookieGame(){

    localStorage.setItem(
        "koraCookies",
        cookies
    );

    localStorage.setItem(
        "koraClickPower",
        clickPower
    );

    localStorage.setItem(
        "koraUpgradeCost",
        upgradeCost
    );

}

function clickCookie(){

    cookies += clickPower;

    saveCookieGame();

    updateCookieUI();

}
// pookie upgrade cookies function, added 2024-06-05 16:30:00
function upgradeCookie(){

    if(cookies < upgradeCost){

        alert(
        "Not enough cookies!"
        );

        return;

    }

    cookies -= upgradeCost;

    clickPower++;

    upgradeCost =
    Math.floor(
        upgradeCost * 1.5
    );

    saveCookieGame();

    updateCookieUI();

}
// pookie reset cookies function, added 2024-06-05 16:30:00
function resetCookies(){

    if(
        confirm(
        "Reset Cookie Clicker?"
        )
    ){

        cookies = 0;

        clickPower = 1;

        upgradeCost = 5;

        saveCookieGame();

        updateCookieUI();

    }

}

if(cookieButton){

    cookieButton.onclick =
    clickCookie;

}

if(cookieUpgrade){

    cookieUpgrade.onclick =
    upgradeCookie;

}

updateCookieUI();

/* CALCULATOR*/

const calcDisplay =
document.getElementById("calcDisplay");

let calcExpression = "";

function press(value) {

    calcExpression += value;

    calcDisplay.value =
    calcExpression;

}

function calculate() {

    if (calcExpression === "") {
        return;
    }

    try {

        calcExpression =
        eval(calcExpression).toString();

        calcDisplay.value =
        calcExpression;

    } catch {

        calcDisplay.value =
        "Error";

        calcExpression = "";

    }

}

function clearCalc() {

    calcExpression = "";

    calcDisplay.value = "";

}
