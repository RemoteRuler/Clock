// Time Calculator Logic
const timeInput1 = document.getElementById('time-input-1');
const timeInput2 = document.getElementById('time-input-2');
const operationSelect = document.getElementById('operation');
const calculateTimeBtn = document.getElementById('calculate-time');
const timeCalculatorResult = document.querySelector('.time-calculator-result');

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60) + minutes; // Convert to total minutes
}

function formatMinutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 24; // Handle overflow for days
    const minutes = totalMinutes % 60;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}`;
}

function calculateTime() {
    const time1Minutes = parseTime(timeInput1.value);
    const time2Minutes = parseTime(timeInput2.value);
    const operation = operationSelect.value;

    let resultMinutes;
    if (operation === 'add') {
        resultMinutes = time1Minutes + time2Minutes;
    } else {
        resultMinutes = time1Minutes - time2Minutes;
    }

    // Handle negative results for subtraction (e.g., -01:30 becomes 22:30)
    if (resultMinutes < 0) {
        resultMinutes = (resultMinutes % (24 * 60) + (24 * 60)) % (24 * 60); // Ensure positive and within 24 hours
    }

    timeCalculatorResult.textContent = `Result: ${formatMinutesToTime(resultMinutes)}`;
}

calculateTimeBtn.addEventListener('click', calculateTime);

// Initial calculation on load
calculateTime();