// Age Calculator Logic
const birthDateInput = document.getElementById('birth-date');
const calculateAgeBtn = document.getElementById('calculate-age');
const ageCalculatorResult = document.querySelector('.age-calculator-result');

function calculateAge() {
    const birthDateInputVal = birthDateInput.value;
    if (!birthDateInputVal) {
        ageCalculatorResult.textContent = 'Please enter a valid date of birth.';
        return;
    }

    const birthDate = new Date(birthDateInputVal);
    // Set birth time to 00:00:00 for consistent calculation if not provided
    birthDate.setHours(0, 0, 0, 0);

    const today = new Date();

    // Calculate age in years, months, days (calendar-based)
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days/months
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate remaining hours, minutes, seconds
    // Create a date object for the "age date" (birth date + calculated years, months, days)
    const ageDate = new Date(birthDate.getFullYear() + years, birthDate.getMonth() + months, birthDate.getDate() + days);

    // Calculate the difference in milliseconds between the ageDate and today
    const remainingMs = today.getTime() - ageDate.getTime();

    const remainingSeconds = Math.floor(remainingMs / 1000);
    const hours = Math.floor(remainingSeconds / 3600) % 24;
    const minutes = Math.floor((remainingSeconds % 3600) / 60) % 60;
    const seconds = remainingSeconds % 60;

    ageCalculatorResult.textContent = `Your age is: ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

calculateAgeBtn.addEventListener('click', calculateAge);
