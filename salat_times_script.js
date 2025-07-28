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

                // Use a reverse geocoding API to get the city name
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.city || data.locality || data.principalSubdivision || 'Unknown Location';
                        locationInfoDiv.textContent = `Location: ${cityName} (Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)})`;
                        const googleSearchUrl = `https://www.google.com/search?q=salat+times+in+${encodeURIComponent(cityName)}`;
                        window.open(googleSearchUrl, '_blank');
                    })
                    .catch(error => {
                        console.error('Error during reverse geocoding:', error);
                        locationInfoDiv.textContent = 'Could not determine city name. Searching with coordinates.';
                        const googleSearchUrl = `https://www.google.com/search?q=salat+times+${latitude.toFixed(5)}+${longitude.toFixed(5)}`;
                        window.open(googleSearchUrl, '_blank');
                    });
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