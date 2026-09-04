document.addEventListener('DOMContentLoaded', () => {
    const latitudeDisplay = document.getElementById('latitude-display');
    const longitudeDisplay = document.getElementById('longitude-display');
    const accuracyDisplay = document.getElementById('accuracy-display');
    const refreshBtn = document.getElementById('refresh-location');
    const googleMapsBtn = document.getElementById('google-maps-btn');
    const statusMessage = document.getElementById('status-message');

    let currentCoordinates = null;

    function setStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.style.color = isError ? '#ff6b6b' : '#999';
    }

    function getLocation() {
        setStatus('Locating...');
        googleMapsBtn.disabled = true;

        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser.', true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentCoordinates = position.coords;
                const { latitude, longitude, accuracy } = currentCoordinates;

                latitudeDisplay.textContent = latitude.toFixed(5);
                longitudeDisplay.textContent = longitude.toFixed(5);
                accuracyDisplay.textContent = `${accuracy.toFixed(1)}m`;
                
                googleMapsBtn.disabled = false;
                setStatus('Location successfully updated.');
            },
            (error) => {
                let msg = 'An unknown error occurred.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = 'You denied the request for Geolocation.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        msg = 'The request to get user location timed out.';
                        break;
                }
                setStatus(`Error: ${msg}`, true);
                currentCoordinates = null;
                latitudeDisplay.textContent = 'N/A';
                longitudeDisplay.textContent = 'N/A';
                accuracyDisplay.textContent = 'N/A';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    function openGoogleMaps() {
        if (currentCoordinates) {
            const { latitude, longitude } = currentCoordinates;
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(mapUrl, '_blank');
        }
    }

    refreshBtn.addEventListener('click', getLocation);
    googleMapsBtn.addEventListener('click', openGoogleMaps);

    // Automatically fetch location on page load
    getLocation();
});