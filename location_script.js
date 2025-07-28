// Location Logic
const latitudeDisplay = document.getElementById('latitude-display');
const longitudeDisplay = document.getElementById('longitude-display');
const accuracyDisplay = document.getElementById('accuracy-display');
const getLocationBtn = document.getElementById('get-location');
const googleMapsIcon = document.getElementById('google-maps-icon');

let currentLatitude = 'N/A';
let currentLongitude = 'N/A';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude.toFixed(5);
                currentLongitude = position.coords.longitude.toFixed(5);

                latitudeDisplay.textContent = currentLatitude;
                longitudeDisplay.textContent = currentLongitude;
                accuracyDisplay.textContent = position.coords.accuracy.toFixed(2);

                googleMapsIcon.style.display = 'block'; // Show the icon once location is obtained
            },
            (error) => {
                let errorMessage = 'Error getting location: ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'User denied the request for Geolocation.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'The request to get user location timed out.';
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage += 'An unknown error occurred.';
                        break;
                }
                latitudeDisplay.textContent = 'N/A';
                longitudeDisplay.textContent = 'N/A';
                accuracyDisplay.textContent = errorMessage;
                googleMapsIcon.style.display = 'none'; // Hide icon on error
            }
        );
    } else {
        latitudeDisplay.textContent = 'Geolocation is not supported by this browser.';
        longitudeDisplay.textContent = 'N/A';
        accuracyDisplay.textContent = 'N/A';
        googleMapsIcon.style.display = 'none'; // Hide icon if not supported
    }
}

function openGoogleMaps() {
    if (currentLatitude !== 'N/A' && currentLongitude !== 'N/A') {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${currentLatitude},${currentLongitude}`;
        window.open(mapUrl, '_blank');
    } else {
        alert('Please get your location first.');
    }
}

getLocationBtn.addEventListener('click', getLocation);
googleMapsIcon.addEventListener('click', openGoogleMaps);

// Initially hide the Google Maps icon
googleMapsIcon.style.display = 'none';
