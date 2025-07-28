// Digital Clock Logic
function setDigitalClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const digitalClockDisplay = document.querySelector('.digital-clock');
    const digitalHours = hours % 12 || 12; // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const digitalMinutes = minutes < 10 ? '0' + minutes : minutes;
    const digitalSeconds = seconds < 10 ? '0' + seconds : seconds;

    digitalClockDisplay.textContent = `${digitalHours}:${digitalMinutes}:${digitalSeconds} ${ampm}`;
}

setInterval(setDigitalClock, 1000);
setDigitalClock();