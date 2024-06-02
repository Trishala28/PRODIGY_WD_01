let startTime, updatedTime, difference, tInterval, running = 0;
let lapCounter = 1;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = 'Pause';
        running = 1;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = 'Start';
        running = 0;
    }
}

function reset() {
    clearInterval(tInterval);
    running = 0;
    difference = 0;
    startStopBtn.innerHTML = 'Start';
    minutesDisplay.innerHTML = '00';
    secondsDisplay.innerHTML = '00';
    millisecondsDisplay.innerHTML = '00';
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = `${minutesDisplay.innerHTML}:${secondsDisplay.innerHTML}:${millisecondsDisplay.innerHTML}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.innerHTML = pad(minutes);
    secondsDisplay.innerHTML = pad(seconds);
    millisecondsDisplay.innerHTML = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
