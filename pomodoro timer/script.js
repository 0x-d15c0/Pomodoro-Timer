let focusButton = document.getElementById('btn-focus');
let shortBreakButton = document.getElementById('btn-shortbreak');
let longBreakButton = document.getElementById('btn-longbreak');
let startButton = document.getElementById('btn-start');
let pauseButton = document.getElementById('btn-pause'); // added pause button reference
let resetButton = document.getElementById('btn-reset');

let focusTitle = document.getElementById('focus');
let shortBreakTitle = document.getElementById('shortbreak');
let longBreakTitle = document.getElementById('longbreak');

let focusTime = 40;
let shortBreakTime = 5;
let longBreakTime = 10;
let seconds = "00";
let timerInterval;
let isTimerRunning = false;
let breakCount = 0;

window.onload = () => {
    document.getElementById('minutes').innerHTML = focusTime;
    document.getElementById('seconds').innerHTML = seconds;

    focusTitle.classList.add('active');
}

function startTimer() {
    startButton.style.display = "none";
    pauseButton.style.display = "block";

    seconds = 59;

    let focusMinutes = focusTime - 1;
    let shortBreakMinutes = shortBreakTime - 1;

    breakCount = 0;

    timerInterval = setInterval(() => {
        document.getElementById('minutes').innerHTML = focusMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        seconds = seconds - 1;

        if (seconds === 0) {
            focusMinutes = focusMinutes - 1;
            if (focusMinutes === -1) {
                if (breakCount % 2 === 0) {
                    focusMinutes = shortBreakMinutes;
                    breakCount++;

                    focusTitle.classList.remove('active');
                    shortBreakTitle.classList.add('active');
                } else {
                    focusMinutes = focusTime;
                    breakCount++;

                    shortBreakTitle.classList.remove('active');
                    focusTitle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }, 1000);

    isTimerRunning = true;
}

function pauseTimer() {
    startButton.style.display = "block";
    pauseButton.style.display = "none";
    
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    setTimer(focusTime);
    updateTimerDisplay();
    startButton.style.display = "block";
    pauseButton.style.display = "none";
}

function setTimer(time) {
    minutes = time;
    seconds = 0;
}

function updateTimerDisplay() {
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
