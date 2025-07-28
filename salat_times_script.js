// Salat Times Logic
const getSalatTimesBtn = document.getElementById('get-salat-times');
const locationInfoDiv = document.querySelector('.location-info');

function getSalatTimesForLocation() {
    if (navigator.geolocation) {
        locationInfoDiv.textContent = 'Getting your location...';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                locationInfoDiv.textContent = `Location: Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`;

                // Construct Google search URL for Salat times at the location
                const googleSearchUrl = `https://www.google.com/search?q=salat+times+${latitude.toFixed(5)}+${longitude.toFixed(5)}`;
                window.open(googleSearchUrl, '_blank');
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
                locationInfoDiv.textContent = errorMessage;
            }
        );
    } else {
        locationInfoDiv.textContent = 'Geolocation is not supported by this browser.';
    }
}

getSalatTimesBtn.addEventListener('click', getSalatTimesForLocation);