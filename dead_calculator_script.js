// Dead Calculator Logic
const birthDateDeadInput = document.getElementById('birth-date-dead');
const calculateDeadTimeBtn = document.getElementById('calculate-dead-time');
const deadCalculatorResult = document.querySelector('.dead-calculator-result');

function calculateDeadTime() {
    const birthDateVal = birthDateDeadInput.value;
    if (!birthDateVal) {
        deadCalculatorResult.textContent = 'Please enter your date of birth.';
        return;
    }

    const birthDate = new Date(birthDateVal);
    const estimatedDeathDate = new Date(birthDate.getFullYear() + 60, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), birthDate.getSeconds());

    const now = new Date();
    const timeRemainingMs = estimatedDeathDate.getTime() - now.getTime();

    const formattedDeathDate = estimatedDeathDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (timeRemainingMs < 0) {
        deadCalculatorResult.textContent = `Estimated death date: ${formattedDeathDate}. The estimated death date has already passed.`;
        return;
    }

    const seconds = Math.floor(timeRemainingMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25); // Account for leap years

    const remainingDays = days % 365.25;
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    deadCalculatorResult.textContent = `Estimated death date: ${formattedDeathDate}. Time remaining until estimated death (60 years from birth): ${years} years, ${Math.floor(remainingDays)} days, ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds.`;
}

calculateDeadTimeBtn.addEventListener('click', calculateDeadTime);
