document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('date-display');
    const salatTimesContainer = document.getElementById('salat-times-container');
    const statusMessage = document.getElementById('status-message');
    const refreshBtn = document.getElementById('refresh-times');

    // Set current date
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    function setStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.style.color = isError ? '#d93025' : '#5f6368';
    }

    function highlightNextPrayer(timings) {
        const now = new Date();
        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let nextPrayerName = null;

        for (const prayer of prayerNames) {
            const prayerTimeStr = timings[prayer].split(' ')[0];
            const [hours, minutes] = prayerTimeStr.split(':');
            const prayerTime = new Date();
            prayerTime.setHours(hours, minutes, 0, 0);

            if (prayerTime > now) {
                nextPrayerName = prayer;
                break;
            }
        }

        if (!nextPrayerName) {
            nextPrayerName = 'Fajr'; // Next prayer is Fajr of the next day
        }

        document.querySelectorAll('.prayer-row').forEach(row => {
            row.classList.remove('next-prayer');
            if (row.dataset.prayer === nextPrayerName) {
                row.classList.add('next-prayer');
            }
        });
    }

    function displaySalatTimes(timings) {
        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let html = '';
        prayerNames.forEach(prayer => {
            if (timings[prayer]) {
                const timeString = timings[prayer].split(' ')[0];
                const [hours, minutes] = timeString.split(':');
                const date = new Date();
                date.setHours(hours, minutes);
                const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                html += `<div class="prayer-row" data-prayer="${prayer}"><strong>${prayer}</strong> <span>${formattedTime}</span></div>`;
            }
        });
        salatTimesContainer.innerHTML = html;
        highlightNextPrayer(timings);
    }

    function fetchSalatTimes(latitude, longitude) {
        setStatus('Fetching prayer times...');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        // Using the calendar endpoint for better reliability
        const apiUrl = `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${year}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network error: Could not reach the prayer times service.`);
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200 && data.data && data.data.length > 0) {
                    // Find today's timings from the calendar data array
                    const todaysData = data.data.find(d => d.date.gregorian.day == day);
                    if (todaysData && todaysData.timings) {
                        displaySalatTimes(todaysData.timings);
                        setStatus('Prayer times loaded successfully.');
                    } else {
                        throw new Error('Could not find prayer times for today in the response.');
                    }
                } else {
                    throw new Error(data.status || 'Invalid response from the prayer times service.');
                }
            })
            .catch(error => {
                console.error('Prayer Times Error:', error);
                setStatus(`Error: ${error.message}`, true);
                salatTimesContainer.innerHTML = ''; // Clear stale data
            });
    }

    function getLocationAndFetchTimes() {
        setStatus('Getting your location...');
        salatTimesContainer.innerHTML = ''; // Clear previous times
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser.', true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchSalatTimes(latitude, longitude);
            },
            (error) => {
                setStatus('Could not get your location. Please allow location access and try again.', true);
            }
        );
    }

    refreshBtn.addEventListener('click', getLocationAndFetchTimes);

    // Automatically fetch data on page load
    getLocationAndFetchTimes();
});
