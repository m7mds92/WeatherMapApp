document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM fully loaded ');

    initMap();

    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityName = cityInput.value.trim();
        if(!cityName) return;
        
        try{
            console.log(`Searching coordinates for ${cityName}`);

            const coords = await getCoordinates(cityName);
            console.log('Coordinates found: ', coords);
            map.setView([coords.lat, coords.lon], 10);

            console.log('Fetching weather data');
            const weatherData = await getWeather(coords.lat, coords.lon);
            console.log('Weather data received: ', weatherData);
            
        } catch(error){
            console.error('Error:', error.message);
            alert(error.message);
        }
    });
});