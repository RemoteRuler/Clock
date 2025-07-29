document.addEventListener('DOMContentLoaded', () => {
    const getSalatTimesBtn = document.getElementById('get-salat-times');
    const salatTimesContainer = document.getElementById('salat-times-container');

    const displayError = (message) => {
        salatTimesContainer.innerHTML = `<p class="error-message">${message}</p>`;
    };

    const displayLoading = () => {
        salatTimesContainer.innerHTML = '<div class="loader"></div>';
    };

    const displaySalatTimes = (timings) => {
        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        let html = '<ul>';
        prayerNames.forEach(prayer => {
            if (timings[prayer]) {
                // Convert to 12-hour format
                const timeString = timings[prayer].split(' ')[0];
                const [hours, minutes] = timeString.split(':');
                const date = new Date();
                date.setHours(hours);
                date.setMinutes(minutes);
                const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                html += `<li><strong>${prayer}:</strong> ${formattedTime}</li>`;
            }
        });
        html += '</ul>';
        salatTimesContainer.innerHTML = html;
    };

    const getSalatTimes = (latitude, longitude) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const method = 2; // ISNA
        const school = 1; // Hanafi

        const apiUrl = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${school}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    displaySalatTimes(data.data.timings);
                } else {
                    throw new Error(data.status || 'Could not fetch prayer times.');
                }
            })
            .catch(error => {
                console.error('Error fetching prayer times:', error);
                displayError('Could not retrieve prayer times. Please try again later.');
            });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            displayLoading();
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getSalatTimes(latitude, longitude);
                },
                (error) => {
                    let errorMessage = 'Error getting location: ';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += 'Please allow location access.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += 'Location information is unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMessage += 'Request for location timed out.';
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage += 'An unknown error occurred.';
                            break;
                    }
                    displayError(errorMessage);
                }
            );
        } else {
            displayError('Geolocation is not supported by this browser.');
        }
    };

    getSalatTimesBtn.addEventListener('click', getLocation);
});